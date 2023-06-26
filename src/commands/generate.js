module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      createView,
      createLabel,
      createMenu,
      createRoute,
      createController,
      createFragment,
      createCrudController,
      createCrudFragment,
      createCrudView,
      createControllerImport,
      createViewImport
    } = toolbox
  
    
    if(!parameters.first){
      console.log("É preciso especificar o tipo [ [p]age | [f]ragment | [r]oute ]");
      return;
    } 

    if(!parameters.second){
      console.log("É preciso especificar o nome");      
      return;
    }

    if(!parameters.second.includes("/")){
      console.log("É preciso especificar a pasta EX CadastrosBasicos/Cadastro");      
      return;
    }
    
    const type       = parameters.first.toLowerCase();
    const folder     = parameters.second;   
    const isPAge     = (type[0] == 'p')
    const isRoute    = (type[0] == 'r')
    const isFragment = (type[0] == 'f')
    const isCrud     = (type[0] == 'c')
    const isImport   = (type[0] == 'i')
    const removeMenu = parameters.third == '-m';
    
    if(isPAge){           
      parameters.array.shift()
      parameters.array.shift();
      
      createView(folder);
      createController(folder);
      createLabel(folder);       
      createRoute(folder, parameters.array)
      if(!removeMenu) {
        createMenu(folder);
      }
    }

    if(isImport){           
      parameters.array.shift()
      parameters.array.shift();
      
      createViewImport(folder);
      createControllerImport(folder);
      createLabel(folder);       
      createRoute(folder, parameters.array)
      if(!removeMenu) {
        createMenu(folder);
      }
    }
    
    if(isCrud){           
      parameters.array.shift()
      parameters.array.shift();
      
      createCrudView(folder);
      createCrudController(folder);
      createLabel(folder);       
      createRoute(folder, parameters.array)
      createCrudFragment(folder)
      if(parameters.array.length == 0) {
        createMenu(folder);
      }
    }

    if(isRoute){
      parameters.array.shift()
      parameters.array.shift();
      
      createRoute(folder, parameters.array)
      if(parameters.array.length == 0) {
        createMenu(folder);
      }
    }

    if(isFragment){
      createFragment(folder)
    }

  }
}
