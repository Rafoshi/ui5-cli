module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info, error, success },
      filesystem
    } = toolbox
  
    
    if(!parameters.first){
      error("É preciso especificar o tipo [ [p]age | [f]ragment]");
      return;
    }    
    if(!parameters.second){
      error("É preciso especificar o nome");
      return;
    }    
    const formatCaptalize = (sName) => {
      if(!sName) return;
      return sName[0].toUpperCase() + sName.slice(1);
    }
    const type = parameters.first.toLowerCase();
    const folder = parameters.second;
    const name = formatCaptalize(folder);
    const destination = `webapp/src/pages/${folder}/${name}`;
    
    const packagePath = 'webapp/manifest.json';
    const appMenuPath = 'webapp/model/data/AppModel.json';
    const i18nPath = 'webapp/i18n/i18n.properties';
    
    const package = await filesystem.read(packagePath, 'json');
    const appMenu = await filesystem.read(appMenuPath, 'json');
    let i18n = await filesystem.read(i18nPath);
    
    const namespace = package.name;
    const destinationTarget = `${namespace}.src.pages.${folder}`;
    const isPAge = (type[0] == 'p')

    let route = {
      pattern: folder,
      name: folder,
      target: folder
    };

    let target = 
      {
        viewName: name,
        viewLevel: 3,
        viewPath: destinationTarget,        
      }
    
    let menu =  {
      title: `Commom.${name}`,
      "icon": "sap-icon://error",
      "expanded": true,
      "key": folder
    }
    i18n += `\r\nCommom.${name}=${name}`

    appMenu.navigation = appMenu.navigation.filter(n => n.key != folder);
    appMenu.navigation.push(menu)
    
    package['sap.ui5'].routing.routes = package['sap.ui5'].routing.routes.filter(x => x.pattern != route.pattern);
    package['sap.ui5'].routing.routes.push(route);
    package['sap.ui5'].routing.targets[route.pattern] = target;
    
    if(isPAge){
      await generate({
        template: 'view.js.ejs',
        target: `${destination}.view.xml`,
        props: { name, folder, namespace }
      });
      
      await generate({
        template: 'controller.js.ejs',
        target: `${destination}.controller.js`,
        props: { name, folder, namespace }
      })
      filesystem.write(packagePath, package)
      filesystem.write(appMenuPath, appMenu)
      filesystem.write(i18nPath, i18n)

      success(`arquivos gerados em: ${destination}`);
    }
    else{
      await generate({
        template: 'fragment.js.ejs',
        target: `${destination}.fragment.xml`,
        props: { name, folder, namespace }
      });

      success(`arquivos gerados em: ${destination}`);
    }

   
   

  }
}
