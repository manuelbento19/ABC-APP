import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export function Banner(){
    return(
        <section style={{backgroundImage: `url('https://img.freepik.com/fotos-premium/acordo-de-equipa-jovem-organizacao-acordo-de-forca_198067-195188.jpg?w=740')`}} className="bg-cover bg-center bg-no-repeat bg-fixed h-screen relative overflow-hidden">
            <Shadow/>
            <div className="relative z-10 flex items-center justify-center h-full sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="max-w-2xl text-center mx-auto px-4 sm:px-6">
                    <p className="inline-block text-base font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-blue-500 text-transparent">
                        <strong className='font-extrabold'>ABC</strong> ANGOLA BUSINESS CONNECT
                    </p>
                    <h1 className="mt-5 text-gray-200 max-w-2xl block font-semibold text-4xl md:text-5xl lg:text-6xl">
                        Conectando o mundo dos negócios
                    </h1>
                    <p className="mt-5 text-gray-200">
                        Junte-se à nossa rede e transforme suas ideias em sucesso. Nossa plataforma facilita conexões estratégicas, impulsionando inovações e criando oportunidades de crescimento para todos.
                    </p>
                    <Link to="/login" className="mt-8 mx-auto py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-transparent border-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                        Saiba mais
                        <MdChevronRight className="flex-shrink-0 size-4"/>
                    </Link>
                </div>
            </div>
        </section>
    );
}

const Shadow = () =>  {
    return <div className="flex absolute inset-0 bg-black/70"></div>
}
