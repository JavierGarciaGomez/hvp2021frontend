import React from "react";

export const MainPageFooter = () => {
  return (
    <footer className="mainPages-site-footer">
      <p>Made by Javier García</p>
      <div className="mainPages-site-footer__social">
        <ul id="social-ul">
          <li>
            <a
              href="https://www.linkedin.com/in/javier-garcia-gomez/"
              target="_blank"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="mailto:javieron.garcia@gmail.com" target="_blank">
              <i className="fa fa-envelope"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/JavierGarciaGomez" target="_blank">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://codepen.io/javier-garc-a-g-mez" target="_blank">
              <i className="fab fa-codepen"></i>
            </a>
          </li>
          <li>
            <a href="https://www.freecodecamp.org/javiergarcia" target="_blank">
              <i className="fab fa-free-code-camp"></i>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/javierongarcia" target="_blank">
              <i className="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/javierongarcia" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
