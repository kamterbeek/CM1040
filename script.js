class SimpleTemplateEngine {
constructor(template_url) {
this.template_url = template_url;
}

  loadTemplate(){
  return fetch(this.template_url)
    .then(response => response.text())
    .then(text => {
      
    }
  }
}
