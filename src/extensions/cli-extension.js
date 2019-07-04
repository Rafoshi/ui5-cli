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
    const manifestPath = 'webapp/manifest.json';
    const manifest = await filesystem.read(manifestPath, 'json');
    return manifest;
  }
  async function saveManifest(manifest) {
    const manifestPath = 'webapp/manifest.json';
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
    const manifestPath = 'webapp/manifest.json';

    manifest['sap.ui5'].routing.routes = manifest['sap.ui5'].routing.routes.filter(x => x.pattern != route.pattern);
    manifest['sap.ui5'].routing.routes.push(route);
    manifest['sap.ui5'].routing.targets[route.target] = target;
    filesystem.write(manifestPath, manifest)
  }

  async function getProperties(folder, params) {
    let manifest = await getManifest();
    let namespace = manifest.name;
    let pattern = `${folder}`;
    let target = `${folder}`;
    let name = formatCaptalize(folder)
    let segments = ''
    let destTarget = `${namespace}.src.pages.${folder}`;
    let destination = `webapp/src/pages/${folder}/${name}`;

    if (params) segments = params.map(z => `{${z}}`).join('/');
    if (segments != '') pattern += `/${segments}`;

    return {
      namespace,
      name,
      segments,
      destTarget,
      pattern,
      destination,
      target
    };
  }

  async function createRoute(folder, params) {

    let props = await getProperties(folder, params);

    let route = {
      pattern: props.pattern,
      name: folder,
      target: props.target
    };

    let target = {
      viewName: props.target,
      viewLevel: 3,
      viewPath: props.destTarget,
    }

    manifest = addRoute(route, target)
    saveManifest(manifest);
    info(`--Adicionado nova rota: ${props.pattern}`)
    info(`--Adicionado target para rota: ${props.target}`)
  }
  async function createLabel(folder) {
    let name = formatCaptalize(folder);
    const i18nPath = 'webapp/i18n/i18n.properties';
    let i18n = await filesystem.read(i18nPath);
    let text= `Commom.${name}=${name}`;
    i18n+=`\r\n${text}`;

    filesystem.write(i18nPath, i18n)
    success(`i18n Alterado ${i18nPath}`)
    info(`--Adicionado: ${text}`)
  }

  async function createMenu(folder) {
    const appMenuPath = 'webapp/model/data/AppModel.json';
    const appMenu = await filesystem.read(appMenuPath, 'json');
    let name = formatCaptalize(folder);
    let title =`Commom.${name}`
    let menu = {
      title,
      "icon": "sap-icon://error",
      "expanded": true,
      "key": folder
    }

    appMenu.navigation = appMenu.navigation.filter(n => n.key != folder);
    appMenu.navigation.push(menu);

    filesystem.write(appMenuPath, appMenu)
    success(`JSON MENU alterado: ${appMenuPath}`)
    info(`--Adicionado menu: key=${folder} title=${title}`)

  }

  async function removeMenu(folder) {
    const appMenuPath = 'webapp/model/data/AppModel.json';
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
        folder: folder,
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
        folder: folder,
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
        folder,
        namespace: props.namespace
      }
    });

    success(`FRAGMENTO CRIADO: ${target}`);
  }

  toolbox.createController = createController;
  toolbox.createMenu = createMenu
  toolbox.createRoute = createRoute
  toolbox.createView = createView
  toolbox.createLabel = createLabel
  toolbox.createFragment = createFragment

}