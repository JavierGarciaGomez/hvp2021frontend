import React, { Fragment } from "react";

export const MainPagesAdvices = () => {
  return (
    <Fragment>
      <div className="mainPages__container__style2 pb-3">
        <div className="container">
          <section>
            <div className="section-title">
              <div className="icon-container">
                <img src="icons/dog.png" alt="" />
              </div>
              <h2 className="title">Blog</h2>
              <div className="icon-container">
                <img src="icons/cat.png" alt="" />
              </div>
            </div>
            <div>
              <article className="blog-post">
                <div className="blog-img">
                  <img
                    src="https://shandree.files.wordpress.com/2018/04/calupoh-el-espectacular-perro-lobo-de-mc3a9xico-1.png?w=640"
                    alt="Blog"
                  />
                </div>
                <div className="text-post">
                  <a
                    href="https://shandree.wordpress.com/2018/04/19/calupoh-perro-lobo-mexicano/"
                    target="_blank"
                  >
                    <h4>CALUPOH PERRO LOBO DE MÉXICO ESTÁNDAR RACIAL</h4>
                  </a>
                  <p>
                    Escrito el: <span>19/04/2018</span> por:{" "}
                    <span>Dr. Rafael García</span>
                  </p>
                  <p>
                    El perro lobo de México surge como un hibridismo entre el
                    perro y el lobo gris que se llevó a cabo en el México
                    prehispánico desde inicios de nuestra era hasta el siglo
                    XVI. Esta práctica fue posible debido a la enorme similitud
                    genética entre ambas especies y, gracias a un intenso
                    trabajo arqueo-zoológico, fue posible identificar al primer
                    ejemplar en 1999...{" "}
                    <a href="https://shandree.wordpress.com/2018/04/19/calupoh-perro-lobo-mexicano/">
                      Continúa leyendo
                    </a>
                  </p>
                </div>
              </article>

              <article className="blog-post">
                <div className="blog-img">
                  <img
                    src="https://shandree.files.wordpress.com/2018/03/fcm-cert-estudios-rx-e1521918181553.jpg?w=640"
                    alt="Blog"
                  />
                </div>
                <div className="text-post">
                  <a
                    href="https://shandree.wordpress.com/2018/03/24/certificacion-para-estudios-de-rayos-x/"
                    target="_blank"
                  >
                    <h4>Certificación para Estudios de Rayos X</h4>
                  </a>
                  <p>
                    Escrito el: <span>19/04/2018</span> por:{" "}
                    <span>Dr. Rafael García</span>
                  </p>
                  <p>
                    La Federación Canófila Mexicana extiende el presente
                    Certificado para los estudios radiológicos en los casos de
                    Displasia de Cadera, Displasia de codo y Luxación patelar...{" "}
                    <a
                      href="https://shandree.wordpress.com/2018/03/24/certificacion-para-estudios-de-rayos-x/"
                      target="_blank"
                    >
                      Continúa leyendo
                    </a>{" "}
                  </p>
                </div>
              </article>

              <article className="blog-post">
                <div className="blog-img">
                  <img
                    src="https://shandree.files.wordpress.com/2017/10/estudio-de-nombre-2.jpg?w=640&h=478"
                    alt="Blog"
                  />
                </div>
                <div className="text-post">
                  <a
                    href="https://shandree.wordpress.com/2017/10/20/nombres-para-perros-mas-populares-en-espana/"
                    target="_blank"
                  >
                    <h4>Nombres para perros mas populares en España</h4>
                  </a>
                  <p>
                    Escrito el: <span>20/10/2017</span> por:{" "}
                    <span>Dr. Rafael García</span>
                  </p>
                  <p>
                    A continuación les compartimos un estudio realizado en
                    España con los nombres mas populares de perros, Disfrútenlo
                    y compartanlo sirve para ver que tanto nos parecemos en
                    pensamiento como canofilos con nuestros hermanos de
                    España....{" "}
                    <a
                      href="https://shandree.wordpress.com/2017/10/20/nombres-para-perros-mas-populares-en-espana/"
                      target="_blank"
                    >
                      Continúa leyendo
                    </a>{" "}
                  </p>
                </div>
              </article>
            </div>
            <div className="d-flex justify-content-center blog-btn">
              <a href="https://shandree.wordpress.com/" target="_blank">
                <button type="button" className="btn btn-lg btn-primaryBG">
                  Lea más artículos del Blog
                </button>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className="light-background">
        <div className="container">
          <section>
            <div className="section-title">
              <div className="icon-container">
                <img src="icons/dog.png" alt="" />
              </div>
              <h2 className="title">Videoconsejos para mascotas</h2>
              <div className="icon-container">
                <img src="icons/cat.png" alt="" />
              </div>
            </div>
            <div>
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-interval="false"
              >
                <ol className="carousel-indicators">
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                  ></li>
                  <li
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="3"
                  ></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FVideoconsejosParatuMascota%2Fvideos%2F412337669812407%2F&show_text=false&width=560"
                      width="560"
                      height="314"
                      style={({ border: "none" }, { overflow: "hidden" })}
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                  <div className="carousel-item">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=420&href=https%3A%2F%2Fwww.facebook.com%2FVideoconsejosParatuMascota%2Fvideos%2F285936789338346%2F&show_text=false&width=560"
                      width="560"
                      height="420"
                      style={({ border: "none" }, { overflow: "hidden" })}
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                  <div className="carousel-item">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FVideoconsejosParatuMascota%2Fvideos%2F557986751518628%2F&show_text=false&width=560"
                      width="560"
                      height="314"
                      style={({ border: "none" }, { overflow: "hidden" })}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                  <div className="carousel-item">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FVideoconsejosParatuMascota%2Fvideos%2F172548350706812%2F&show_text=false&width=560"
                      width="560"
                      height="314"
                      style={({ border: "none" }, { overflow: "hidden" })}
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden={true}
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden={true}
                  ></span>
                  <span className="visually-hidden">Next</span>
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center blog-btn">
              <a
                href="https://www.facebook.com/VideoconsejosParatuMascota"
                target="_blank"
              >
                <button type="button" className="btn btn-lg btn-primaryBG">
                  Conoce videoconsejos para tu mascota
                </button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};
