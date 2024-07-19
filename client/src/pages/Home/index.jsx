
import { Header } from '../../components/Header/index';
import { Banner } from '../../components/Banner';
import { FaGlobe, FaMicrophone, FaMoneyBill, FaTruck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const items = [
  {
    title: "Marketing",
    description: "Amplie sua presença de marca e conquiste novos mercados com estratégias inovadoras de marketing digital.",
    icon: FaMicrophone
  },
  {
    title: "Importação e Exportação",
    description: "Facilite suas transações globais com serviços de importação e exportação eficientes e seguros.",
    icon: FaTruck
  },
  {
    title: "Contabilidade",
    description: "Garanta uma gestão contábil precisa e confiável para um crescimento sustentável e compliance fiscal.",
    icon: FaMoneyBill
  },
  {
    title: "Tecnologia",
    description: "Adote soluções tecnológicas avançadas que impulsionam a eficiência e a competitividade do seu negócio.",
    icon: FaGlobe
  }
]

export function Home(){
  return(
    <>
      <Header/>
      <Banner/>
      <section  class="bg-white text-zinc-700">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div class="mx-auto max-w-lg text-center">
            <h2 class="text-3xl font-bold sm:text-4xl">Conectamos Empresas e Empreendedores</h2>
            <p class="mt-4 text-zinc-400 text-sm">Transforme seu negócio conectando-se com os melhores provedores de serviços em marketing, tecnologia, importação e exportação, contabilidade e serviços jurídicos. Nossa plataforma facilita parcerias estratégicas, oferecendo acesso a recursos essenciais para impulsionar seu sucesso e inovação no mercado.</p>
          </div>
          <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item,index)=>(
              <article key={index} class="block rounded-xl border border-gray-200 p-6 shadow-xl transition hover:cursor-pointer hover:border-blue-500/10 hover:shadow-blue-500/10">
                <div className='w-fit p-4 bg-white border border-gray-200 rounded-full'>
                  <item.icon class="size-7 text-slate-900/95"/>
                </div>
                <h2 class="mt-4 text-base font-bold text-zinc-600/80">{item.title}</h2>
                <p class="mt-2 text-xs text-zinc-600/60 font-normal">{item.description}</p>
              </article>
            ))}
          </div>
          <div id='servicos' className='mt-12 text-center'>
            <Link to="/login" class="inline-block rounded bg-slate-900 px-12 py-3 text-sm font-medium text-white transition">
              Ver mais
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
