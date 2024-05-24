function highlightAllCompanies(companies) {
    try {
        var jobTitles = document.querySelectorAll('.job-card-container__primary-description, .job-details-jobs-unified-top-card__company-name');

        jobTitles.forEach(jobTitle => {
            if (jobTitle.querySelector('.companyNameElementclass') == null) {
                highlightCompanies(companies, jobTitle);
            }
        });
    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        console.error(e.message);
    }
}
function highlightCompanies(companies, jobElement) {
    try {
        const text = jobElement.textContent.trim();

        const matchingCompanies = companies.filter(company => company.includes(text));
        if (matchingCompanies.length > 0) {
            jobElement.style.backgroundColor = 'yellow';

            // Create a new element to display the company names
            const companyElement = document.createElement('div');
            companyElement.style.fontSize = 'small';
            companyElement.style.color = 'red';

            matchingCompanies.forEach(matchingCompany => {
                const companyNameElement = document.createElement('div');
                companyNameElement.className = 'companyNameElementclass';
                var matchingCompanyText = matchingCompany.replace(text, '<b>' + text + '</b>');
                companyNameElement.innerHTML = `Company: ${matchingCompanyText}`;
                companyElement.appendChild(companyNameElement);
            });

            // Append the new element under the job title/company name element
            jobElement.appendChild(companyElement);
        }
    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        console.error(e.message);
    }
}
function checkRelocationPackage() {
    try {
        const jobDetails = document.querySelector('.jobs-search__job-details');
        if (jobDetails) {
            const text = jobDetails.textContent.toLowerCase();
            const relocationKeywords = ["relocation", "moving allowance", "relocation package", "relocation assistance"];

            const hasRelocationPackage = relocationKeywords.some(keyword => text.includes(keyword));

            if (hasRelocationPackage) {
                jobDetails.style.border = '2px solid green'; // Add a border to highlight relocation package
                const relocationElement = document.createElement('div');
                relocationElement.textContent = "Rel0cati0n Package Found :D ";
                relocationElement.style.fontSize = 'small';
                relocationElement.style.color = 'green';
                relocationElement.className = 'relocclass';
                if (!text.includes("rel0cati0n")) {
                    var title = jobDetails.querySelector('.job-details-jobs-unified-top-card__job-title');
                    if (title) {
                        var old = title.querySelector('.relocclass');
                        if (old)
                            title.removeChild(old)
                        title.appendChild(relocationElement);
                    }
                    reset();
                }

            }
            else {
                jobDetails.style.border = ''; // remove a border
                const relocationElement = document.createElement('div');
                relocationElement.textContent = ":No Rel0cation Found :( ";
                relocationElement.style.fontSize = 'small';
                relocationElement.style.color = 'red';
                relocationElement.className = 'relocclass';
                if (!text.includes("rel0cation")) {
                    var title = jobDetails.querySelector('.job-details-jobs-unified-top-card__job-title');
                    if (title) {
                        var old = title.querySelector('.relocclass');
                        if (old)
                            title.removeChild(old)
                        title.appendChild(relocationElement);
                    }
                    reset();
                }
            }

        }
    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        console.error(e.message);
    }

}
function reset() {
    var items = document.querySelector('.jobs-search__job-details').querySelectorAll('.companyNameElementclass');
    items.forEach(element => {
        element.parentNode.removeChild(element);
    });
}
function observeJobElements(companies) {
    try {
        const jobContainer = document.querySelector('.jobs-search-results-list');

        if (jobContainer) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {  // Check if the added node is an element
                            const jobElement = node.querySelector('.job-card-container__primary-description, .job-details-jobs-unified-top-card__company-name');
                            if (jobElement) {
                                highlightCompanies(companies, jobElement);
                                checkRelocationPackage();
                            }
                        }
                    });
                });
            });

            observer.observe(jobContainer, { childList: true, subtree: true });

            // Initial highlighting of already present job elements
            const jobElements = jobContainer.querySelectorAll('.job-card-container__primary-description, .job-details-jobs-unified-top-card__company-name');
            jobElements.forEach(jobElement => {
                highlightCompanies(companies, jobElement);
            });
        }
    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        console.error(e.message);
    }
    try {
        const jobDetailContainer = document.querySelector('.jobs-search__job-details');
        if (jobDetailContainer) {
            const detailsObserver = new MutationObserver(() => {
                checkRelocationPackage();
            });
            detailsObserver.observe(jobDetailContainer, {
                characterDataOldValue: true,
                subtree: true, childList: true, characterData: true
            });
        }
        // Initial check for already present job details
        checkRelocationPackage();
    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        console.error(e.message);
    }
}
function load() {
    // Load the companies list from storage
    browser.storage.local.get('companies').then(({ companies }) => {
        if (companies) {
            observeJobElements(companies);

            setInterval(() => {
                checkRelocationPackage();
            }, 1000);

            setInterval(() => {
                highlightAllCompanies(companies);
            }, 1000);
        }
    });
}

load();
// Ensure the script runs only after the page content is fully loaded
window.onload = function () {
    load();
};

function copyJobInfo() {
    
    var jobCompanyName = '';
    var jobCompanyFullName = '';
    var jobTitle = '';
    var jobLink = '';
    var relocation = '';
    var tertiary1 = '';
    var tertiary2 = '';
    var tertiary3 = '';
    var tertiary4 = '';
    var tertiary5 = '';
    try {
        jobCompanyName = document.querySelector('.job-details-jobs-unified-top-card__company-name').querySelector('a').innerText;
        jobTitle = document.querySelector('.job-details-jobs-unified-top-card__job-title').querySelector('h1 a').innerText;

        tertiary1 = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description').children[0].innerText;
        tertiary2 = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description').children[1].innerText;
        tertiary3 = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description').children[2].innerText;
        tertiary4 = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description').children[3].innerText;
        tertiary5 = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description').children[4].innerText;

        jobLink = document.querySelector('.job-details-jobs-unified-top-card__job-title').querySelector('h1 a').href;
        relocation = document.querySelector('.relocclass').innerText;
        jobCompanyFullName = document.querySelector('.job-details-jobs-unified-top-card__company-name').querySelector('.companyNameElementclass').innerText;
    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        console.error(e.message);
    }
    navigator.clipboard.writeText(jobCompanyName + '\t' + jobCompanyFullName + '\t' + jobTitle + '\t' + relocation + '\t' + tertiary1 + '\t' + tertiary2 + '\t' + tertiary3 + '\t' + tertiary4 + '\t' + tertiary5 + '\t' + jobLink);
    reset();
}

browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'report_back') {
        copyJobInfo();
    }
});