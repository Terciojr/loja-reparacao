import { Link } from 'react-router-dom';

// Social Icons
const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.8a9.72 9.72 0 00-4.849.07C4.98 4.18 3.37 5.79 3.22 8.15c-.057 1.26-.067 1.63-.067 4.85s.01 3.59.067 4.85c.15 2.36 1.76 3.97 4.12 4.12 1.26.057 1.63.067 4.85.067s3.59-.01 4.85-.067c2.36-.15 3.97-1.76 4.12-4.12.057-1.26.067-1.63.067-4.85s-.01-3.59-.067-4.85c-.15-2.36-1.76-3.97-4.12-4.12C15.59 4.03 15.22 4.02 12 4.02zm0 2.88a5.1 5.1 0 100 10.2 5.1 5.1 0 000-10.2zm0 8.4a3.3 3.3 0 110-6.6 3.3 3.3 0 010 6.6zm6.43-7.95a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" /></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.27 0 .34.04.67.11.98-3.54-.18-6.69-1.88-8.8-4.47-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.79 1.9 3.55-.7-.02-1.37-.22-1.95-.5v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.96 2.97-1.46 1.14-3.3 1.82-5.3 1.82-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.1 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.98-2.08z" /></svg>;


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">TechRepair</h3>
            <p className="text-gray-400">
              Sua solução completa em reparos e acessórios para dispositivos eletrônicos.
            </p>
            <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wider uppercase">Links</h4>
            <ul className="space-y-3">
              <li><Link to="/servicos" className="text-gray-400 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/produtos" className="text-gray-400 hover:text-white transition-colors">Produtos</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wider uppercase">Contato</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Rua das Flores, 123</li>
              <li>São Paulo - SP</li>
              <li>(11) 9999-9999</li>
              <li>contato@techrepair.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wider uppercase">Horários</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Seg - Sex: 9h às 18h</li>
              <li>Sábado: 9h às 13h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TechRepair. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;