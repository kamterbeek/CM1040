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
  tag.innerHTML = this.template;
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
    
  ]
}


tEngine.loadTemplate().then(() => {
  console.log('Template loaded:', tEngine.template);
});

