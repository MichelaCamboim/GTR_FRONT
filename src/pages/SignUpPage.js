import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //esse state vai guardar a IMAGEM escolhida pelo usuário
  const [img, setImg] = useState();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    //console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/fileUpload/upload", uploadData);

      console.log(uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //conferir se a senhas estão iguais
    if (form.password !== form.confirmPassword) {
      alert("Senhas incompatíveis");
      return;
    }

    let imgURL = "";
    //vou chamar a função handleUpload()
    if (e.target.profilePicture.value) {
      imgURL = await handleUpload();
    }

    //disparo a requisição de cadastro para o meu servidor
    try {
      await api.post("/user/create", { ...form, profilePic: imgURL });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-3xl mb-2">Sign-Up</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <form>
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="Insira um nome para identificação"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Endereço de e-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Insira o seu melhor endereço de e-mail"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Insira uma senha válida"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme a senha válida criada anteriormente"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="profilePicture">Foto de Perfil</label>
            <input id="profilePicture" type="file" onChange={handleImage} />

            <button className="btn" type="submit">
              Cadastrar usuário
            </button>
          </form>
          <div>
            Já possui cadastro? Faça já o<Link to="/login">login</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default SignUpPage;
