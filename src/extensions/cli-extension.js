// add your CLI-specific functionality here, which will then be accessible


// to your commands
module.exports = toolbox => {

  const {
    template: {
      generate
    },
    print: {
      info,
      error,
      success
    },
    filesystem
  } = toolbox

  async function getManifest() {
    const manifestPath = 'manifest.json';
    
    const manifest = await filesystem.read(manifestPath, 'json');
    return manifest;
  }
  async function saveManifest(manifest) {
    const manifestPath = 'manifest.json';
    filesystem.write(manifestPath, manifest)
    success(`Manifest Alterado: ${manifestPath}`)
   
  }

  async function getNamespace() {
    const namespace = await getManifest().name;
    return namespace;

  }
  const formatCaptalize = (sName) => {
    if (!sName) return;
    return sName[0].toUpperCase() + sName.slice(1);
  }
  async function addRoute(route, target) {
    let manifest = await getManifest();
    const manifestPath = 'manifest.json';

    manifest['sap.ui5'].routing.routes = manifest['sap.ui5'].routing.routes.filter(x => x.pattern != route.pattern);
    manifest['sap.ui5'].routing.routes.push(route);
    manifest['sap.ui5'].routing.targets[route.target] = target;
    filesystem.write(manifestPath, manifest)
  }

  async function getProperties(folder, params) {
    let manifest = await getManifest();    
    let namespace = manifest['sap.app'].id;
    let pattern = `${folder}`;
    let target = `${folder}`;    
    let name = formatCaptalize(folder.substring(folder.lastIndexOf('/') + 1, folder.length))
    let segments = ''
    let stractFolder = folder.substring(0, folder.lastIndexOf('/'));

    let replaceAllBar = (a) => {
      while(a.includes("/")) {
        a = a.replace('/','.')
      }

      return a;
    }
    let destTarget = `${namespace}.mvc.${replaceAllBar(stractFolder)}`;
    let destination = `mvc/${stractFolder}/${name}`;

    if (params) segments = params.map(z => `{${z}}`).join('/');
    if (segments != '') pattern += `/${segments}`;

    return {
      namespace,
      name,
      segments,
      destTarget,
      pattern,
      destination,
      target,
      folder:stractFolder
    };
  }

  async function createRoute(folder, params) {

    let props = await getProperties(folder, params);

    let route = {
      pattern: props.pattern,
      name: props.name,
      target: props.name
    };

    let target = {
      viewName: props.name,
      viewLevel: 3,
      viewPath: props.destTarget,
    }

    manifest = addRoute(route, target)
    saveManifest(manifest);
    info(`--Adicionado nova rota: ${props.pattern}`)
    info(`--Adicionado target para rota: ${props.target}`)
  }
  async function createLabel(folder) {
    let props = await getProperties(folder);
    const i18nPath = 'i18n/i18n.properties';
    let i18n = await filesystem.read(i18nPath);
    let text= `Title.${props.name}=${props.name}`;
    if(i18n.includes(text)){
      info(`--Label já existe: ${text}`)
    }else{
      i18n+=`\r\n${text}`;
      
      filesystem.write(i18nPath, i18n)
      success(`i18n Alterado ${i18nPath}`)
      info(`--Adicionado: ${text}`)
    }
  }

  async function createMenu(folder) {
    let props = await getProperties(folder);

    const appMenuPath = 'mvc/baseModels/data/AppMenuModel.json';
    const appMenu = await filesystem.read(appMenuPath, 'json');
    
    let title =`Title.${props.name}`
    let auth =`${props.name}Visualizar`
    let menu = {
      title,
      "icon": "sap-icon://error",
      "expanded": true,
      "key": props.name,
      "authorization": auth
    }

    appMenu.navigation = appMenu.navigation.filter(n => n.key != props.name);
    appMenu.navigation.push(menu);

    filesystem.write(appMenuPath, appMenu)
    success(`JSON MENU alterado: ${appMenuPath}`)
    info(`--Adicionado menu: key=${props.name} title=${title}`)

  }

  async function removeMenu(folder) {
    const appMenuPath ='mvc/baseModels/AppMenuModel.json';
    const appMenu = await filesystem.read(appMenuPath, 'json');
    appMenu.navigation = appMenu.navigation.filter(n => n.key != folder);
    filesystem.write(appMenuPath, appMenu)
  }

  async function createView(folder, segments) {
    let props = await getProperties(folder, segments);
    let target = `${props.destination}.view.xml`;

    await generate({
      template: 'view.js.ejs',
      target,
      props: {
        name: props.name,
        target : props.destTarget,
        folder: props.folder,
        namespace: props.namespace
      }
    });

    success(`VIEW CRIADA: ${target}`)
  }
  
  async function createCrudView(folder, segments) {
    let props = await getProperties(folder, segments);
    let target = `${props.destination}.view.xml`;

    await generate({
      template: 'crudView.js.ejs',
      target,
      props: {
        name: props.name,
        target : props.destTarget,
        folder: props.folder,
        namespace: props.namespace
      }
    });

    success(`VIEW CRIADA: ${target}`)
  }

  async function createController(folder) {
    let props = await getProperties(folder);
    let controller = `${props.destination}.controller.js`;
    await generate({
      template: 'controller.js.ejs',
      target: controller,
      props: {
        name: props.name,
        target : props.destTarget,
        folder: props.folder,
        namespace: props.namespace
      }
    })
    success(`CONTROLLER CRIADO: ${controller}`);

  }
  async function createViewImport(folder, segments) {
    let props = await getProperties(folder, segments);
    let target = `${props.destination}.view.xml`;

    await generate({
      template: 'viewImportar.js.ejs',
      target,
      props: {
        name: props.name,
        target : props.destTarget,
        folder: props.folder,
        namespace: props.namespace
      }
    });

    success(`VIEW CRIADA: ${target}`)
  }
  async function createControllerImport(folder) {
    let props = await getProperties(folder);
    let controller = `${props.destination}.controller.js`;
    await generate({
      template: 'controllerImportar.js.ejs',
      target: controller,
      props: {
        name: props.name,
        target : props.destTarget,
        folder: props.folder,
        namespace: props.namespace
      }
    })
    success(`CONTROLLER CRIADO: ${controller}`);

  }

  async function createCrudController(folder) {
    let props = await getProperties(folder);
    let controller = `${props.destination}.controller.js`;
    await generate({
      template: 'crudController.js.ejs',
      target: controller,
      props: {
        name: props.name,
        folder: props.folder,
        target : props.destTarget,
        namespace: props.namespace
      }
    })
    success(`CONTROLLER CRIADO: ${controller}`);

  }

  async function createFragment(folder) {

    let props = await getProperties(folder);
    let target = `${props.destination}.fragment.xml`;
    await generate({
      template: 'fragment.js.ejs',
      target,
      props: {
        name: props.name,
        folder: props.folder,
        target : props.destTarget,
        namespace: props.namespace
      }
    });

    success(`FRAGMENTO CRIADO: ${target}`);
  }
  async function createFragmentFixed(folder) {

    let props = await getProperties(folder);
    let target = `${props.destination}.fragment.xml`;
    await generate({
      template: 'fragmentClean.js.ejs',
      target,
      props: {
        name: props.name,
        folder: folder,
        target : props.destTarget,
        namespace: props.namespace
      }
    });

    success(`FRAGMENTO CRIADO: ${target}`);
  }
  async function createFragmentObjeto(folder) {

    let props = await getProperties(folder);
    let target = `${props.destination}.fragment.xml`;
    await generate({
      template: 'fragmentObjeto.js.ejs',
      target,
      props: {
        name: props.name,
        folder: folder,
        target : props.destTarget,
        namespace: props.namespace
      }
    });

    success(`FRAGMENTO CRIADO: ${target}`);
  }
  async function createFragmentResultado(folder) {

    let props = await getProperties(folder);
    let target = `${props.destination}.fragment.xml`;
    await generate({
      template: 'fragmentResultado.js.ejs',
      target,
      props: {
        name: props.name,
        folder: folder,
        target : props.destTarget,
        namespace: props.namespace
      }
    });

    success(`FRAGMENTO CRIADO: ${target}`);
  }
  async function createCrudFragment(folder) {

    let props = await getProperties(folder);
    let target = `${props.destination}.fragment.xml`;
    await generate({
      template: 'crudFragment.js.ejs',
      target,
      props: {
        name: props.name,
        folder:props.folder,
        target : props.destTarget,
        namespace: props.namespace
      }
    });

    success(`FRAGMENTO CRIADO: ${target}`);
  }

  toolbox.createController = createController;
  toolbox.createFragment = createFragment
  toolbox.createView = createView
  toolbox.createMenu = createMenu
  toolbox.createRoute = createRoute
  toolbox.createLabel = createLabel
  toolbox.createCrudController = createCrudController;
  toolbox.createCrudFragment = createCrudFragment
  toolbox.createCrudView = createCrudView
  toolbox.createControllerImport = createControllerImport
  toolbox.createViewImport = createViewImport
  toolbox.createFragmentFixed = createFragmentFixed
  
  
}