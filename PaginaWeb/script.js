document.addEventListener('DOMContentLoaded', () => {
    // Solo si estamos en la página de proyectos (existe projects-grid)
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        const projectCards = document.querySelectorAll('.project-card');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('project-search');
        const noResultsDiv = document.getElementById('no-results');

        function filterProjects() {
            const activeTech = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            const searchTerm = searchInput.value.trim().toLowerCase();
            let anyVisible = false;

            projectCards.forEach(card => {
                const techAttr = card.getAttribute('data-tech'); // string con techs separadas por espacio
                const nameAttr = card.getAttribute('data-name')?.toLowerCase() || '';
                const cardText = card.innerText.toLowerCase();

                let techMatch = false;
                if (activeTech === 'all') {
                    techMatch = true;
                } else {
                    const techList = techAttr ? techAttr.split(' ') : [];
                    techMatch = techList.includes(activeTech);
                }

                let searchMatch = (searchTerm === '') || nameAttr.includes(searchTerm) || cardText.includes(searchTerm);

                if (techMatch && searchMatch) {
                    card.style.display = 'flex';
                    anyVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });
            noResultsDiv.style.display = anyVisible ? 'none' : 'block';
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProjects();
            });
        });
        if (searchInput) searchInput.addEventListener('input', filterProjects);
        filterProjects(); // Ejecutar al inicio
    }

    // Formulario de contacto (mailto)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const message = document.getElementById('contact-msg')?.value.trim();
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            const subject = `Contacto desde portfolio - ${name}`;
            const body = `Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${message}%0A%0A-- Enviado desde portfolio de Andrea Valverde`;
            window.location.href = `mailto:andrea.valverde.martinez.2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            alert('Se abrirá tu cliente de correo. Gracias por contactarme.');
            contactForm.reset();
        });
    }

    // Smooth scroll para enlaces internos (por si los hubiera)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});