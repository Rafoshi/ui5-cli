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
    console.log(parameters)
    
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
    const package = await filesystem.read('package.json', 'json');
    const namespace = package.name;
    const destination = `webapp/src/pages/${folder}/${name}`;
    const isPAge = (type[0] == 'p')
    
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
