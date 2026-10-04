/**
 * App.js - Dark 3D Interactive Engine
 * Handles 3D card tilt physics, cursor light tracking, modal windows & WhatsApp links.
 */

const PHONE_NUMBER = "5493412531113"; // Replace with client's actual WhatsApp number

function getWhatsAppLink(message) {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Interactive 3D Tilt Engine for Cards (.card-3d)
  const cards3D = document.querySelectorAll(".card-3d");

  cards3D.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angle (-8deg to +8deg)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
    });
  });

  // 2. Dynamic WhatsApp Link Binding
  const defaultMessage = "¡Hola! Vi su página web y me gustaría cotizar mi primera página web profesional para mi negocio.";

  const waFloat = document.getElementById("wa-float-btn");
  if (waFloat) waFloat.href = getWhatsAppLink(defaultMessage);

  const waHero = document.getElementById("wa-hero-btn");
  if (waHero) {
    waHero.href = getWhatsAppLink("¡Hola! Quiero cotizar mi primera página web profesional. ¿Me pueden dar más información?");
  }

  const waFinal = document.getElementById("wa-final-btn");
  if (waFinal) {
    waFinal.href = getWhatsAppLink("¡Hola! Estoy listo para dar el primer paso online con mi negocio. ¡Quiero mi web!");
  }

  document.querySelectorAll(".plan-wa-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const planName = btn.getAttribute("data-plan") || "Emprendedor";
      const planPrice = btn.getAttribute("data-price") || "";
      const planMsg = `¡Hola! Me interesa contratar el *${planName}* (${planPrice}) para mi negocio. ¿Cómo empezamos?`;
      window.open(getWhatsAppLink(planMsg), "_blank");
    });
  });

  // 3. Portfolio Modal Logic (6 Projects)
  const modal = document.getElementById("portfolio-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalClose = document.getElementById("modal-close");

  const portfolioData = {
    coffee: {
      title: "Gastronomía: Restaurantes y Cafeterías",
      desc: "Menú interactivo con panel administrable, precios actualizados y pedidos directos a WhatsApp.",
      img: "assets/images/portfolio_gastronomia.jpg"
    },
    consulting: {
      title: "Servicios Profesionales: Consultoría & Asesoría",
      desc: "Presentación de propuesta de valor, testimonios y agendamiento rápido de reuniones.",
      img: "assets/images/portfolio_consultoria.jpg"
    },
    barber: {
      title: "Belleza y Bienestar: Estética & Barbería",
      desc: "Lista de precios, galería de fotos y reserva de turnos por WhatsApp.",
      img: "assets/images/portfolio_barberia.jpg"
    },
    corporate: {
      title: "Institucional: Web Corporativa",
      desc: "Presentación de empresa, propuesta de valor, catálogo de servicios y contacto directo.",
      img: "assets/images/portfolio_corporativo.jpg"
    },
    ecommerce: {
      title: "E-commerce: Muestra tus Productos",
      desc: "Catálogo de productos, ficha técnica y pedidos o compra directa por WhatsApp.",
      img: "assets/images/portfolio_ecommerce.jpg"
    },
    realestate: {
      title: "Inmobiliarias y Real Estate: Catálogo Inmobiliario",
      desc: "Catálogo de propiedades, fichas técnicas y consulta directa por WhatsApp.",
      img: "assets/images/portfolio_inmobiliaria.jpg"
    }
  };

  document.querySelectorAll(".portfolio-card").forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.getAttribute("data-key");
      const data = portfolioData[key];
      if (data && modal) {
        modalImg.src = data.img;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modal.classList.add("active");
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
});
