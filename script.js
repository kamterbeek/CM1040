class SimpleTemplateEngine {
    constructor(template_url) {
        this.template_url = template_url;
    }

    loadTemplate() {
        return fetch(this.template_url)
            .then(response => response.text())
            .then(text => {
                this.template = text;
            });
    }

    renderTemplate(tag_id, data) {
        const tag = document.getElementById(tag_id);
        let output = this.template;

        // Each loops
        output = output.replace(
            /{{#each (\w+)}}([\s\S]*?){{\/each}}/g,
            (match, arrayName, templateFragment) => {

                const listOfThings = data[arrayName];

                if (!Array.isArray(listOfThings)) {
                    return '';
                }

                return listOfThings
                    .map(item =>
                        this.replaceVariablesInFragment(templateFragment, item)
                    )
                    .join('');
            }
        );

        // If-Else conditions
        output = output.replace(
            /{{#if (\w+)}}([\s\S]*?){{else}}([\s\S]*?){{\/if}}/g,
            (match, condition, ifContent, elseContent) => {
                return data[condition] ? ifContent : elseContent;
            }
        );

        // If conditions without else
        output = output.replace(
            /{{#if (\w+)}}([\s\S]*?){{\/if}}/g,
            (match, condition, ifContent) => {
                return data[condition] ? ifContent : '';
            }
        );

        // Variable swapping
        output = output.replace(
            /{{(\w+)}}/g,
            (match, dataField) => {
                return data[dataField] ?? '';
            }
        );

        tag.innerHTML = output;
    }

    replaceVariablesInFragment(templateFragment, data) {
        return templateFragment.replace(
            /{{(\w+)}}/g,
            (match, dataKey) => {
                return data[dataKey] ?? '';
            }
        );
    }
}


// Create an instance of the template engine
const tEngine = new SimpleTemplateEngine('template.html');


// Load the template first
tEngine.loadTemplate()
    .then(() => {

        console.log('Template loaded successfully.');

        // Load the Netherlands Internet history data
        return fetch('data.json');
    })
    .then(response => {

        if (!response.ok) {
            throw new Error('Could not load data.json');
        }

        return response.json();
    })
    .then(jsonData => {

        console.log('JSON data loaded:', jsonData);

        // Basic JSON validation
        if (!jsonData.events || !Array.isArray(jsonData.events)) {
            throw new Error(
                'Invalid JSON data: events must be an array.'
            );
        }

        // Render the data into the page
        tEngine.renderTemplate('content', jsonData);

    })
    .catch(error => {
        console.error('Error loading website data:', error);

        const content = document.getElementById('content');

        if (content) {
            content.innerHTML =
                '<p>Sorry, there was a problem loading the website data.</p>';
        }
    });
