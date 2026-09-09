class SimpleTemplateEngine {
constructor(template_url) {
this.template_url = template_url;
}

  loadTemplate(){
  return fetch(this.template_url)
    .then(response => response.text())
    .then(text => {
      this.template = text;
    });
  }
renderTemplate(tag_id, data) {
  const tag = document.getElementById(tag_id);
  let output = this.template;
  
// each loops
  output = output.replace(/{{#each (\w)}}([\s\S]*?){{\/each}}/g, match, arrayName, templateFragment) => {
    const listOfThings = data[arrayName];

    if (!Array.isArray(listOfThings)) {
      return '';
    }
    return listOfThings.map(item => this.replaceVariablesInFragment(templateFragment, item)).join('');
    
  });

// If-Else conditions
        output = output.replace(/{{#if (\w+)}}([\s\S]*?){{else}}([\s\S]*?){{\/if}}/g, (match, condition, ifContent, elseContent) => {
            return data[condition] ? ifContent : elseContent;
        });

        // If conditions without else
        output = output.replace(/{{#if (\w+)}}([\s\S]*?){{\/if}}/g, (match, condition, ifContent) => {
            return data[condition] ? ifContent : '';
        });
  
//variable swapping
  output = output.replace(/{{\w+)}}/g, (match, datafield) => {
    return data[dataField];
  });
  
  tag.innerHTML = output;              
}
  replaceVariablesInFragment(templateFragment, data) {
    return templateFragment.replace(/{{(\w+)}}/g, (match, dataKey) => {
      return data[dataKey];
    });
  }
}

// create an instance and load the template
const tEngine = new SimpleTemplateEngine('template.html');

const data = {
  title: "Page title",
  content: "Page content",
  subtitle: "Page sub title",
  loggedIn: true,
  username: "nobody",
  subcontent: "Page sub content",
  items: [
    { title: "item 1", description: "Desc 1" },
    { title: "item 2", description: "Desc 2"}
  ]
  
};


tEngine.loadTemplate().then(() => {
  console.log('Template loaded:', tEngine.template);
  tEngine.renderTemplate("content", data);
});

