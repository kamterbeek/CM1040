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
}
// create an instance and load the template
const tEngine = new SimpleTemplateEngine('template.html');

tEngine.loadTemplate().then(() => {
  console.log('Template loaded:', tEngine.template);
});
