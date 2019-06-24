module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async toolbox => {
    const {
      parameters,
      template: { generate },
      print: { info, error, success }
    } = toolbox

    if(!parameters.first){
      error("É preciso especificar o nome da pasta");      
      return;
    }
    if(!parameters.second){
      error("É preciso especificar o nome da pagína");
      return;
    }
    if(!parameters.third){
      error("É preciso especificar o nome o Namespace do projeto");
      return;
    }

    const folder = parameters.first.toLowerCase();
    const name = parameters.second    
    const namespace = parameters.third;
 console.log(namespace)
    const destination = `webapp/src/pages/${folder}/${name}`;

    await generate({
      template: 'view.js.ejs',
      target: `${destination}.view.xml`,
      props: { name, folder, namespace }
    })
    
    await generate({
      template: 'controller.js.ejs',
      target: `${destination}.controller.js`,
      props: { name, folder, namespace }
    })

    info(`arquivos gerados em: ${destination}`);

  }
}
