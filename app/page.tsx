import { ArrowDown, ArrowUpRight, Code2, Database, Layers, Terminal } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Projects } from '@/components/Projects';

export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <div className="availability">
            <span /> DESENVOLVEDOR FULL STACK
          </div>
          <h1>
            Construo software.
            <br />
            <span>Resolvo problemas.</span>
          </h1>
          <p>
            Sou Jhonathan Dourado. Conecto interfaces, APIs e dados para transformar problemas reais
            em aplicações que fazem sentido.
          </p>
          <div className="hero-actions">
            <a href="#projetos" className="button primary">
              Conheça meu trabalho <ArrowDown size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/jhonathan-dourado-846239324/"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-caption">
            <span>São Paulo, Brasil</span>
            <span className="tiny-dot" />
            Java no backend. Curiosidade em tudo.
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Diagrama: uma interface se conecta à API e ao banco de dados"
        >
          <div className="art-top">
            <span className="status-led" /> SYSTEM THINKING <span>v.01</span>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-core">
            <Code2 size={44} strokeWidth={1.4} />
            <span>ideia → solução</span>
          </div>
          <div className="art-node node-ui">
            <Layers size={20} />
            <span>interface</span>
          </div>
          <div className="art-node node-api">
            <Terminal size={20} />
            <span>API</span>
          </div>
          <div className="art-node node-data">
            <Database size={20} />
            <span>dados</span>
          </div>
          <div className="art-bottom">
            <span>01 IDEIA</span>
            <span className="art-line" />
            <span>02 CÓDIGO</span>
            <span className="art-line" />
            <span>03 IMPACTO</span>
          </div>
        </div>
      </section>
      <div className="tech-strip">
        <div className="container">
          <span>MINHA CAIXA DE FERRAMENTAS</span>
          <p>
            Java <i>/</i> Spring Boot <i>/</i> React <i>/</i> TypeScript <i>/</i> SQL <i>/</i> Git
          </p>
        </div>
      </div>
      <Projects />
      <section id="sobre" className="section about-section container">
        <div className="about-intro">
          <span className="eyebrow">02 / QUEM ESTÁ POR TRÁS</span>
          <h2>
            Entender primeiro.
            <br />
            <span>Construir melhor.</span>
          </h2>
          <p>
            Gosto de investigar a causa de um problema e acompanhar a solução até ela funcionar para
            quem vai usar.
          </p>
          <div className="about-tags">
            <span>Backend Java</span>
            <span>Engenharia de Software</span>
            <span>São Paulo</span>
          </div>
        </div>
        <div className="about-body">
          <p>
            Sou técnico em Desenvolvimento de Sistemas pela ETEC e estudante de Engenharia de
            Software na FIAP. Meu foco é backend Java, sem perder de vista o que acontece na
            interface e no banco.
          </p>
          <div className="experience">
            <div className="experience-date">2026 · MAR — OUT</div>
            <h3>Desenvolvimento de sistemas</h3>
            <span>Virtsel Tecnologia</span>
            <p>
              Trabalhei em sistemas para operações de telecomunicações, com interfaces, APIs, mapas,
              relatórios e integrações. No Fidere 2, desenvolvi a nova versão e refatorei o banco de
              dados.
            </p>
          </div>
          <div className="experience">
            <div className="experience-date">FORMAÇÃO & PROJETOS</div>
            <h3>Aprender construindo</h3>
            <span>FIAP · ETEC · Alura</span>
            <p>
              Do backend do Ristretto, meu TCC na ETEC, aos projetos em React: uso cada aplicação
              para aprofundar arquitetura, testes e decisões de engenharia.
            </p>
          </div>
        </div>
      </section>
      <section id="contato" className="section contact-section container">
        <div className="contact-copy">
          <span className="eyebrow">03 / PRÓXIMA CONVERSA</span>
          <h2>
            Uma boa ideia
            <br />
            começa com um <span>oi.</span>
          </h2>
          <p>
            Tem um projeto, uma oportunidade ou quer trocar uma ideia sobre tecnologia? Vamos
            conversar.
          </p>
          <a
            href="https://www.linkedin.com/in/jhonathan-dourado-846239324/"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Também estou no LinkedIn <ArrowUpRight size={16} />
          </a>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
