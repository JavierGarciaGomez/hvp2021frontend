import React, { Fragment } from "react";
import { MainPagesSectionHeader } from "./components/MainPagesSectionHeader";

export const MainPagesCompany = () => {
  return (
    <Fragment>
      <section className="bg-primary--ti-st section-pb section-pt">
        <div className="container">
          <MainPagesSectionHeader title="Empresa" />
          <div className="mp-video-wrapper">
            <iframe
              width="727"
              height="409"
              src="https://www.youtube.com/embed/qNzuMdmLWJQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="mp-company__text">
            <p>
              El Hospital Veterinario Peninsular es una empresa con más de 30
              años de experiencia y la primera en su tipo en el sureste de
              México. Es el primer Hospital Veterinario en la ciudad de Mérida y
              abre sus puertas el 26 de Noviembre de 1990.
            </p>
            <p>
              Su Objetivo fue crear un hospital con todo lo necesario para que
              una mascota pueda encontrar los servicios médicos, quirúrgicos y
              de diagnóstico especializados en los animales de compañía.
            </p>
            <p>
              El fundador, MVCA Rafel A García López, siendo yucateco de
              nacimiento y habiendo tenido desde pequeño muchas mascotas, tuvo
              la visión de estudiar en la ciudad de Puebla, donde existían
              estudios especializados en la clínica de animales de compañía, en
              la Universidad Cuetlaxcoapan, ahora Universidad Mesoamericana
              Campus Puebla.
            </p>
            <p>
              La Vanguardia en la tecnología es su distinción; Es una referencia
              médica en diversas áreas de la especialidad y únicos en el sureste
              Mexicano practicando cirugía de cataratas con facoemulsificación
              (técnica de mínima invasión).
            </p>
            <p>
              La oportunidad de servirle es una de sus metas, su colaboración
              con ella es muy valiosa y unidos lograrán con sus mascotas, un
              lugar de plenitud en la localidad.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary--ti-er section-pb">
        <div className="container">
          <MainPagesSectionHeader title="Misión, visión y valores" />
          <div className="mp-company__text">
            <h3>Misión</h3>
            <p>
              La misión de la empresa es ofrecer servicios veterinarios con la
              calidez y atención que merecen las mascotas, valorándolas por lo
              que son y lo que hoy representan.
            </p>
            <h3>Visión</h3>
            <p>
              La visión es ser el modelo de atención veterinaria de todo el
              sureste del país.
            </p>
            <h3>Valores</h3>
            <p>
              Los valores son el profesionalismo, la empatía, la calidad, el
              desarrollo de los trabajadores, la responsabilidad social y la
              honestidad.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary--ti-st section-pb">
        <div className="container">
          <MainPagesSectionHeader title="Logo, eslogan y mascota" />

          <div className="mp-company__text">
            <h3>Eslogan</h3>
            <p>
              Soy Especialista en la Salud de las mascotas, disfruto mucho
              hacerlo, ademas soy filantropo (persona que ama al ser Humano). Si
              necesitas un consejo sobre estos Temas, cuenta conmigo. Si tienes
              algo que compartir que me ayude a ser mejor persona, leere con
              atención tus comentarios.
            </p>
            <p>
              Ser el especialista en cuestión, define la pasión y la entrega con
              la que se realiza cualquier actividad que además se disfruta,
              logrando ofrecer un servicio de referencia que posee conocimientos
              y experiencias de vanguardia.
            </p>
            <p>
              Este Eslogan, resume en breves líneas una vida de congruencia
              entre todo aquello que se sueña y se desea, con lo que se practica
              físicamente. Por lo tanto… En cualquier menester de la vida,
              recurrir con el especialista en cuestión, siempre es la mejor
              opción
            </p>
            <h3>Logo</h3>
            <p>Nuestro logotipo contiene una triada:</p>
            <p>
              1.- de perfil es un Perro de Raza Terrier e inspirado en el
              Terrier escoces de nombre “shandree” que existió en nuestras vidas
              y lo hemos personificado con una botarga que es la mascota de la
              empresa y nos ayuda a promoverla.
            </p>
            <p>
              2.- Visto de frente y compartiendo el unico ojo del logotipo se
              aprecia la cara de un gato cuya nariz es el centro del mismo y se
              aprecian sus bigotes.
            </p>
            <p>
              {" "}
              3.- Las manos del hombre que como propietario del mismo los arropa
              en sus manos donde casi topan los 4 dedos largos de ambas manos y
              el dedo gordo sobre ellos; la extensión de los brazos al mismo
              tiempo forman una V de victoria y al mismo tiempo de veterinaria
              que es nuestra profesión amada que nos dio los conocimientos para
              proporcionarles (a las mascotas) los cuidados que necesitan.
            </p>
            <h3>Mascota</h3>
            <p>
              Nombre de la mascota más significativa de nuestro director médico,
              Rafael A. García López, cuya silueta esta en el logotipo y en el
              corazón de la empresa, como una muestra física de que nadie muere,
              Shandree existe en todas las moléculas de la canofilía bajo
              nuestra perspectiva y mantenerla en nuestras vidas dan testimonio
              de aliento para todos aquellos que pierden algo o a alguien.
              Enhorabuena.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
