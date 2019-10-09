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
      createFragment
    } = toolbox
  
    
    if(!parameters.first){
      error("É preciso especificar o tipo [ [p]age | [f]ragment | [r]oute ]");
      return;
    } 

    if(!parameters.second){
      error("É preciso especificar o nome");
      return;
    }    
    
    const type = parameters.first.toLowerCase();
    const folder = parameters.second;   
    const isPAge = (type[0] == 'p')
    const isRoute = (type[0] == 'r')
    const isFragment = (type[0] == 'f')
    
    if(isPAge){           
      parameters.array.shift()
      parameters.array.shift();
      
      createView(folder);
      createController(folder);
      createLabel(folder);       
      createRoute(folder, parameters.array)
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
