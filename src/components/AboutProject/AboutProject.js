import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div className="about-project__columns">
          <h3 className="about-project__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__columns">
          <h3 className="about-project__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__weeks">
        <p className="about-project__grid">1 неделя</p>
        <p className="about-project__grid">4 недели</p>
        <p className="about-project__grid">Back-end</p>
        <p className="about-project__grid">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
