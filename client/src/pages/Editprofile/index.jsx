import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"; // Importe o contexto de autenticação
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import CapaDefault from "../../assets/img/CapaDefoult.jpg";
import ProfileDefault from "../../assets/img//profileDefoult.png";
import axios from "axios";

export const ProfileEdit = () => {
  const { user,getUser, setUser, userType } = useContext(AuthContext); // Acesse o usuário e as funções do contexto
  const navigate = useNavigate(); // Adiciona o hook useNavigate para redirecionamento
  const [formData, setFormData] = useState({}); // Inicializa formData como um objeto vazio
  const [isOpen, setIsOpen] = useState(false); // Estado para o modal de mensagem
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Adiciona o estado para mostrar a senha
  
  // Função para atualizar o estado com os dados do formulário
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Função para enviar os dados para a API
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log("user?.id", user?.id);
  
    try {
      const response = await axios.put(`http://localhost:3001/usuarios/${user?.id}`, {
        ...formData,
        tipo: user?.tipo, 
        ...(user?.company && { companyID: user?.company.id }),
        ...(user?.entrepreneur && { entrepreneurID: user?.entrepreneur.id }),
        DataNascimento: formData.DataNascimento,
      });
  
      console.log("sucesso: ", response.data);
      console.log("Response Status:", response.status);
  
      // // Directly using response.data as it is already parsed
      const updatedUser = response?.data;
      setUser(updatedUser); // Update user in AuthContext
      console.log("Response :",updatedUser); // Update user in AuthContext
  
      // setFormData({
      //   Email: updatedUser.Email,
      //   Endereco: updatedUser.Endereco,
      //   Telefone: updatedUser.Telefone,
      //   AreaAtuacao: updatedUser.AreaAtuacao,
      //   Provincia: updatedUser.Provincia,
      //   Senha: updatedUser.Senha, // Update the password in formData
      //   ...(userType === "empresa" && {
      //     NomeRepresentante: updatedUser.company?.NomeRepresentante,
      //     NomeEmpresa: updatedUser.company?.NomeEmpresa,
      //     NIF: updatedUser.company?.NIF,
      //     AnosDeExistencia: updatedUser.company?.AnosDeExistencia,
      //   }),
      //   ...(userType === "empreendedor" && {
      //     Nome: updatedUser.entrepreneur?.Nome,
      //     Genero: updatedUser.entrepreneur?.Genero,
      //     DataNascimento: updatedUser.entrepreneur?.DataNascimento,
      //     BI: updatedUser.entrepreneur?.BI,
      //   }),
      // });
  
      setMessage({
        type: "success",
        text: "Perfil atualizado com sucesso!",
      }); // Set success message
      setIsOpen(true); // Open message modal
  
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
  
      setMessage({
        type: "error",
        text: "Erro ao atualizar o perfil. Tente novamente mais tarde.",
      }); // Set error message
      setIsOpen(true); // Open message modal
    }
    console.log("Message", message);
  };
  

  const closeModal = () => {
    setIsOpen(false);
    // Redireciona para a página de perfil apenas se a atualização for bem-sucedida
    if (message && message.type === "success") {
      navigate("/userpage");
    }
  };

  const fetchUser = async () => {
    const userData = await getUser(); // Fetch the user data
    console.log("getUser()", userData); // Log the fetched user data

    if (userData) {
      setFormData((prevFormData) => {
        return {
          // Fill the form with the current user's data
          Email: userData?.Email,
          Endereco: userData?.Endereco,
          Telefone: userData?.Telefone,
          AreaAtuacao: userData?.AreaAtuacao,
          Provincia: userData?.Provincia,
          Senha: userData?.Senha, // Include the current password in formData
          // Specific fields for Empresa or Empreendedor
          ...(userType === "empresa" && {
            NomeRepresentante: userData?.company?.NomeRepresentante,
            NomeEmpresa: userData?.company?.NomeEmpresa,
            NIF: userData?.company?.NIF,
            AnosDeExistencia: userData?.company?.AnosDeExistencia,
          }),
          ...(userType === "empreendedor" && {
            Nome: userData?.entrepreneur?.Nome,
            Genero: userData?.entrepreneur?.Genero,
            DataNascimento: userData?.entrepreneur?.DataNascimento,
            BI: userData?.entrepreneur?.BI,
          }),
        };
      });
    }
  };
  
  useEffect(() => {  
    fetchUser();
  }, [userType]); 
 
  return user ? (
    <div
      className="flex min-screen-full flex-1 flex-col justify-center lg:mt-28 align-middle bg-gray-900"
    >
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl m-auto mx-auto">
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Editar Perfil
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="Email"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                className="lowercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                value={formData?.Email}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="Endereco"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Endereço:
              </label>
              <input
                type="text"
                id="Endereco"
                name="Endereco"
                className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                value={formData?.Endereco}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="Telefone"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Telefone:
              </label>
              <input
                type="text"
                id="Telefone"
                name="Telefone"
                className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                value={formData?.Telefone}
                onChange={handleChange}
                required
                minLength={9}
                maxLength={9}
                pattern="[0-9]{9}"
              />
            </div>
            <div>
              <label
                htmlFor="AreaAtuacao"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Área de Atuação:
              </label>
              <input
                type="text"
                id="AreaAtuacao"
                name="AreaAtuacao"
                className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                value={formData?.AreaAtuacao}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="Provincia"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Província:
              </label>
              <input
                type="text"
                id="Provincia"
                name="Provincia"
                className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                value={formData?.Provincia}
                onChange={handleChange}
                required
              />
            </div>
            {/* Campos específicos para Empresa ou Empreendedor */}
            {userType === "empresa" && (
              <>
                <div>
                  <label
                    htmlFor="NomeRepresentante"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Nome do Representante:
                  </label>
                  <input
                    type="text"
                    id="NomeRepresentante"
                    name="NomeRepresentante"
                    className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.NomeRepresentante}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="NomeEmpresa"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Nome da Empresa:
                  </label>
                  <input
                    type="text"
                    id="NomeEmpresa"
                    name="NomeEmpresa"
                    className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.NomeEmpresa}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="NIF"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    NIF:
                  </label>
                  <input
                    type="text"
                    id="NIF"
                    name="NIF"
                    className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.NIF}
                    onChange={handleChange}
                    required
                    minLength={9}
                    maxLength={9}
                    pattern="[0-9]{9}"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="AnosDeExistencia"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Anos de Existência:
                  </label>
                  <input
                    type="number"
                    id="AnosDeExistencia"
                    name="AnosDeExistencia"
                    className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.AnosDeExistencia}
                    onChange={handleChange}
                    required
                    min={0}
                    maxLength={50}
                    minLength={0}
                    pattern="[0-9]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Senha"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Senha:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Senha"
                    name="Senha"
                    className=" w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.Senha}
                    onChange={handleChange}
                    required
                    minLength={8}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)"
                  />
                  <span
                    className="ml-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar Senha" : "Mostrar Senha"}
                  </span>
                </div>
              </>
            )}
            {userType === "empreendedor" && (
              <>
                <div>
                  <label
                    htmlFor="Nome"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Nome:
                  </label>
                  <input
                    type="text"
                    id="Nome"
                    name="Nome"
                    className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.Nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Genero"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Género:
                  </label>
                  <select
                    type="text"
                    id="Genero"
                    name="Genero"
                    className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.Genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="DataNascimento"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Data de Nascimento:
                  </label>
                  <input
                    type="date"
                    id="DataNascimento"
                    name="DataNascimento"
                    className="lowercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={
                      formData?.DataNascimento
                        ? new Date(formData?.DataNascimento)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    } // Formata a data
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="BI"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    BI:
                  </label>
                  <input
                    type="text"
                    id="BI"
                    name="BI"
                    className="uppercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.BI}
                    onChange={handleChange}
                    required
                    minLength={14}
                    maxLength={14}
                    pattern="^\d{9}[A-Z]{2}\d{3}$"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="Senha"
                    className="block text-gray-200 text-sm font-bold mb-2"
                  >
                    Senha:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Senha"
                    name="Senha"
                    className=" w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                    value={formData?.Senha}
                    onChange={handleChange}
                    required
                    minLength={8}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)"
                  />
                  <span
                    className="ml-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar Senha" : "Mostrar Senha"}
                  </span>
                </div>
              </>
            )}
          </div>
          {/* Adicionar campos para Website e Redes Sociais, se necessário */}
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="col-span-1 mt-4 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="col-span-1 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
        {/* Modal de Mensagem */}
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-900"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-900"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                ​
              </span>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-900"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-900"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Informação
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {message ? message.text : ""}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  ) : (
    <p>Usuario Não encontrado</p>
  );
};