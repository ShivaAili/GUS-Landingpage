document.addEventListener('DOMContentLoaded', () => {
    // Selectors for main tabs and their content
    const tabLinks = document.querySelectorAll('.institutions-tab-link');
    const tabContents = document.querySelectorAll('.institutions-tab-content');
  
    // Selectors for sub-tabs within the content
    const subTabLinks = document.querySelectorAll('.institutions-sub-tab-link');
  
    // Helper function to activate a tab
    function activateTab(link, linksGroup, contentGroup) {
      // Remove active states from all tabs and content
      linksGroup.forEach(link => link.classList.remove('active-link'));
      contentGroup.forEach(content => content.classList.remove('active-content'));
  
      // Activate clicked tab and corresponding content
      link.classList.add('active-link');
      const tabContent = document.getElementById(link.dataset.tab);
      if (tabContent) {
        tabContent.classList.add('active-content');
      }
    }
  
    // Helper function to activate a sub-tab
    function activateSubTab(link, parentTab) {
      const subTabLinks = parentTab.querySelectorAll('.institutions-sub-tab-link');
      const subTabContents = parentTab.querySelectorAll('.institutions-cards');
  
      // Remove active states from all sub-tabs and content
      subTabLinks.forEach(subLink => subLink.classList.remove('active-sub-link'));
      subTabContents.forEach(content => (content.style.display = 'none'));
  
      // Activate clicked sub-tab and corresponding content
      link.classList.add('active-sub-link');
      const subTabContent = parentTab.querySelector(`[data-subtab-content="${link.dataset.subtab}"]`);
      if (subTabContent) {
        subTabContent.style.display = 'flex';
      } else {
        console.error(`No content found for sub-tab: ${link.dataset.subtab}`);
      }
    }
  
    // Event listeners for main tabs
    tabLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        activateTab(link, tabLinks, tabContents);
  
        // Automatically activate the first sub-tab of the activated main tab
        const activatedTabContent = document.getElementById(link.dataset.tab);
        if (activatedTabContent) {
          const firstSubTabLink = activatedTabContent.querySelector('.institutions-sub-tab-link');
          if (firstSubTabLink) {
            activateSubTab(firstSubTabLink, activatedTabContent);
          }
        }
      });
    });
  
    // Event listeners for sub-tabs
    subTabLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const parentTab = link.closest('.institutions-tab-content');
        if (parentTab) {
          activateSubTab(link, parentTab);
        } else {
          console.error('Parent tab content not found for sub-tab link:', link);
        }
      });
    });
  
    // Automatically activate the first tab and its sub-tab on page load
    if (tabLinks.length > 0 && tabContents.length > 0) {
      activateTab(tabLinks[0], tabLinks, tabContents);
  
      const firstTabContent = tabContents[0];
      const firstSubTabLink = firstTabContent.querySelector('.institutions-sub-tab-link');
      if (firstSubTabLink) {
        activateSubTab(firstSubTabLink, firstTabContent);
      }
    }
  });
  



//   function changeAgent(name, role, description, imageSrc) {
//     // Update agent information when clicked
//     document.getElementById('agent-name').innerText = name;
//     document.getElementById('agent-role').innerText = role;
//     document.getElementById('agent-description').innerText = description;
//     document.getElementById('agent-img').src = imageSrc;

//     // Move the clicked image to the center and update the description text
//     let agentImages = document.querySelectorAll('.agent-img');
//     agentImages.forEach((img) => {
//         img.classList.remove('active-agent');
//     });

//     let selectedAgent = document.querySelector(`img[src='${imageSrc}']`);
//     selectedAgent.classList.add('active-agent');
// }


let agents = [
  {
    name: "Alicia",
    role: "Agent",
    description: "Lorem Ipsum is simply dummy text...",
    imageSrc: "assets/Alicia.jpg"
  },
  {
    name: "Ali",
    role: "Agent",
    description: "Lorem Ipsum is simply dummy text...",
    imageSrc: "assets/Ali.jpg"
  },
  {
    name: "Steve",
    role: "Agent",
    description: "Lorem Ipsum is simply dummy text...",
    imageSrc: "assets/steve.webp"
  },
  {
    name: "Emma",
    role: "Agent",
    description: "Lorem Ipsum is simply dummy text...",
    imageSrc: "assets/Emma.jpeg"
  },
  {
    name: "Lucas",
    role: "Agent",
    description: "Lorem Ipsum is simply dummy text...",
    imageSrc: "assets/Lucas.jpeg"
  }
];

let currentIndex = 0;

function changeAgent(index) {
  currentIndex = index;
  updateAgentInfo();
}

function navigateAgent(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = agents.length - 1; // Wrap around to last
  if (currentIndex >= agents.length) currentIndex = 0;   // Wrap around to first
  updateAgentInfo();
}

function updateAgentInfo() {
  const currentAgent = agents[currentIndex];
  document.getElementById("agent-name").innerText = currentAgent.name;
  document.getElementById("agent-role").innerText = currentAgent.role;
  document.getElementById("agent-description").innerText = currentAgent.description;
  document.getElementById("agent-img").src = currentAgent.imageSrc;

  // Highlight the active agent
  const agentImages = document.querySelectorAll(".agent-img");
  agentImages.forEach((img, idx) => {
    img.classList.toggle("active-agent", idx === currentIndex);
  });
}
