import { ArrowUpRight, ChevronRight, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Projects } from '@/components/Projects';
import { TableOfContents } from '@/components/TableOfContents';

export default function Home() {
  return (
    <main id="main" className="docs-page">
      <article className="doc-article">
        <nav aria-label="Localização" className="breadcrumb">
          <span>Portfólio</span>
          <ChevronRight size={13} />
          <span>Visão geral</span>
        </nav>
        <section id="visao-geral" className="overview">
          <div className="document-label">Desenvolvedor full stack</div>
          <h1>Jhonathan Dourado</h1>
          <p className="lead">Desenvolvimento de sistemas com foco em Java e Spring Boot.</p>
          <p>
            Sou técnico em Desenvolvimento de Sistemas pela ETEC e estudante de Engenharia de
            Software na FIAP. Trabalhei com sistemas de telecomunicações, APIs, interfaces e bancos
            de dados na Virtsel Tecnologia.
          </p>
          <div className="profile-links">
            <span>
              <MapPin size={14} /> São Paulo, Brasil
            </span>
            <a href="https://github.com/Jhowzxcv" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/jhonathan-dourado-846239324/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
        <Projects />
        <section id="experiencia" className="doc-section">
          <h2>
            Experiência
            <a className="heading-anchor" href="#experiencia" aria-label="Link para Experiência">
              #
            </a>
          </h2>
          <div className="experience-heading">
            <div>
              <h3>Virtsel Tecnologia</h3>
              <p>Desenvolvimento de sistemas</p>
            </div>
            <span>mar — out 2026</span>
          </div>
          <p>Atuei em sistemas para operações de telecomunicações, incluindo:</p>
          <ul className="experience-list">
            <li>
              <strong>Fidere 2.</strong> Desenvolvimento da nova versão, com frontend, backend e
              refatoração do banco de dados.
            </li>
            <li>
              <strong>Fidere.</strong> Fluxos operacionais, painéis, mapas, relatórios e integrações
              com o Oracle Field Service Cloud.
            </li>
            <li>
              <strong>Fiber Cut.</strong> Integração com equipamentos de monitoramento de fibra
              óptica, testes remotos e visualização de rotas e alarmes.
            </li>
          </ul>
          <h3 className="subsection-heading">Formação e estudos</h3>
          <dl className="education-list">
            <div>
              <dt>FIAP</dt>
              <dd>Engenharia de Software · em andamento</dd>
            </div>
            <div>
              <dt>ETEC</dt>
              <dd>Técnico em Desenvolvimento de Sistemas</dd>
            </div>
            <div>
              <dt>Alura</dt>
              <dd>Estudos de Java, Spring Boot e desenvolvimento web</dd>
            </div>
          </dl>
        </section>
        <section id="tecnologias" className="doc-section">
          <h2>
            Tecnologias
            <a className="heading-anchor" href="#tecnologias" aria-label="Link para Tecnologias">
              #
            </a>
          </h2>
          <div className="table-scroll">
            <table className="technology-table">
              <thead>
                <tr>
                  <th scope="col">Área</th>
                  <th scope="col">Tecnologias</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Backend</th>
                  <td>Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate</td>
                </tr>
                <tr>
                  <th scope="row">Frontend</th>
                  <td>React, Angular, Next.js, TypeScript, JavaScript, HTML, CSS</td>
                </tr>
                <tr>
                  <th scope="row">Dados</th>
                  <td>SQL Server, PostgreSQL, MySQL</td>
                </tr>
                <tr>
                  <th scope="row">Ferramentas</th>
                  <td>Git, Docker, Maven, Gradle, Postman, Swagger/OpenAPI</td>
                </tr>
                <tr>
                  <th scope="row">Testes</th>
                  <td>JUnit, Mockito</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section id="contato" className="doc-section contact-section">
          <h2>
            Contato
            <a className="heading-anchor" href="#contato" aria-label="Link para Contato">
              #
            </a>
          </h2>
          <p>
            Envie uma mensagem pelo formulário ou pelo{' '}
            <a
              href="https://www.linkedin.com/in/jhonathan-dourado-846239324/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            .
          </p>
          <ContactForm />
        </section>
      </article>
      <TableOfContents />
    </main>
  );
}
