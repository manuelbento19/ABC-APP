// Importando as dependências necessárias
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Importando a biblioteca JWT

// Criando uma instância do app Express
const app = express();
// Habilita CORS para todas as origens (ajuste para sua necessidade)
app.use(cors());
// Configurando o middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Configurando as credenciais de conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "resolve",
  password: "resolve",
  database: "abc_app",
});

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso!");
});

// Chave secreta para geração do token JWT
const secretKey = "GoodBless@202"; // Utilize uma chave secreta mais segura em produção

// Rotas da API
app.post("/login", (req, res) => {
  const { Email, Senha } = req.body;

  // Verifique se o email e a senha foram fornecidos
  if (!Email || !Senha) {
    return res.status(400).json({ error: "Email e Senha são obrigatórios" });
  }

  // Consulta no banco de dados para verificar se o usuário existe
  db.query(
    "SELECT * FROM Usuario WHERE Email = ? AND Senha = ?",
    [Email, Senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao realizar o login:", err);
        return res.status(500).json({ error: "Erro ao realizar o login" });
      }

      // Verifique se o usuário foi encontrado
      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // O usuário foi encontrado - autenticação bem-sucedida
      const usuario = results[0];

      // Gerando o token JWT
      const token = jwt.sign({ userId: usuario.id }, secretKey, {
        expiresIn: "5h",
      }); // Definindo a duração do token (1 hora)

      // Obter o tipo do usuário (dentro do callback da consulta)
      db.query(
        "SELECT tipo FROM Usuario WHERE id = ?",
        [usuario.id],
        (err, tipoResults) => {
          if (err) {
            // Tratar o erro caso a consulta SQL falhe
            console.error("Erro ao obter o tipo do usuário:", err);
            return res
              .status(500)
              .json({ error: "Erro ao obter o tipo do usuário" });
          } else {
            // Se a consulta for bem-sucedida:
            if (tipoResults.length > 0) {
              // Verifique se encontrou um resultado
              usuario.tipo = tipoResults[0].tipo; // Adiciona o tipo ao objeto usuario

              // Retornando o token JWT para o frontend
              return res.json({
                message: "Login bem-sucedido",
                token: token,
                user: usuario,
              });
            } else {
              // Tratar o caso onde o tipo não foi encontrado (erro ou inconsistência)
              console.error(
                "Tipo de usuário não encontrado para o ID:",
                usuario.id
              );
              return res
                .status(400)
                .json({ error: "Tipo de usuário inválido" });
            }
          }
        }
      );
    }
  );
});

// 1. Usuários

// GET /usuarios - Retorna todos os usuários
app.get("/register", (req, res) => {
  db.query("SELECT * FROM Usuario", (err, results) => {
    if (err) {
      console.error("Erro ao obter os usuários:", err);
      res.status(500).json({ error: "Erro ao obter os usuários" });
      return;
    }
    res.json(results);
  });
});

// GET /usuarios/:id - Retorna um usuário específico pelo ID
app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Usuario WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o usuário:", err);
      res.status(500).json({ error: "Erro ao obter o usuário" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /register - Cria um novo usuário e associa a Empresa ou Empreendedor

app.post("/register", (req, res) => {
  const { Email, Endereco, Telefone, AreaAtuacao, Provincia, Senha, tipo } =
    req.body;

  // Validação do tipo de usuário
  if (!["empresa", "empreendedor"].includes(tipo)) {
    res.status(400).json({
      error: 'Tipo de usuário inválido. Use "empresa" ou "empreendedor".',
    });
    return;
  }

  // Cadastro do usuário
  db.query(
    "INSERT INTO Usuario (Email, Endereco, Telefone, AreaAtuacao, Provincia, Senha, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [Email, Endereco, Telefone, AreaAtuacao, Provincia, Senha, tipo],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o usuário:", err);
        res.status(500).json({ error: "Erro ao criar o usuário" });
        return;
      }
      const usuarioId = results.insertId;

      // Cadastro de Empresa ou Empreendedor
      if (tipo === "empresa") {
        const { NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia } =
          req.body;
        db.query(
          "INSERT INTO Empresa (NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia, UsuarioID) VALUES (?, ?, ?, ?, ?)",
          [NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia, usuarioId],
          (err, results) => {
            if (err) {
              console.error("Erro ao criar a empresa:", err);
              res.status(500).json({ error: "Erro ao criar a empresa" });
              return;
            }
            res.status(201).json({
              message: "Usuário e Empresa criados com sucesso",
              id: usuarioId,
            });
          }
        );
      } else if (tipo === "empreendedor") {
        const { Nome, Genero, DataNascimento, BI } = req.body;
        db.query(
          "INSERT INTO Empreendedor (Nome, Genero, DataNascimento, BI, UsuarioID) VALUES (?, ?, ?, ?, ?)",
          [Nome, Genero, DataNascimento, BI, usuarioId],
          (err, results) => {
            if (err) {
              console.error("Erro ao criar o empreendedor:", err);
              res.status(500).json({ error: "Erro ao criar o empreendedor" });
              return;
            }
            res.status(201).json({
              message: "Usuário e Empreendedor criados com sucesso",
              id: usuarioId,
            });
          }
        );
      }
    }
  );
});

// PUT /usuarios/:id - Atualiza um usuário existente
app.put("/usuarios/:id", (req, res) => {
  const id = req.params.id; // ID do usuário
  const { Email, Endereco, Telefone, AreaAtuacao, Provincia, Senha, tipo } =
    req.body;

  // Verifica se o tipo de usuário foi enviado e se é válido
  if (tipo && !["empresa", "empreendedor"].includes(tipo)) {
    return res.status(400).json({
      error: 'Tipo de usuário inválido. Use "empresa" ou "empreendedor".',
    });
  }

  // Atualizar dados do usuário na tabela Usuario
  db.query(
    "UPDATE Usuario SET Email = ?, Endereco = ?, Telefone = ?, AreaAtuacao = ?, Provincia = ?, Senha = ?, tipo = ? WHERE id = ?",
    [Email, Endereco, Telefone, AreaAtuacao, Provincia, Senha, tipo, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o usuário:", err);
        return res.status(500).json({ error: "Erro ao atualizar o usuário" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Se o usuário for uma empresa, atualiza os dados na tabela Empresa
      if (tipo === "empresa") {
        const { NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia } =
          req.body;
        db.query(
          "UPDATE Empresa SET NomeRepresentante = ?, NomeEmpresa = ?, NIF = ?, AnosDeExistencia = ? WHERE UsuarioID = ?",
          [NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia, id], // Usa o ID do usuário (id) aqui
          (err, results) => {
            if (err) {
              console.error("Erro ao atualizar a empresa:", err);
              return res
                .status(500)
                .json({ error: "Erro ao atualizar a empresa" });
            }
            return res.json({ message: "Atualização realizada com sucesso" });
          }
        );
      }
      // Se o usuário for um empreendedor, atualiza os dados na tabela Empreendedor
      else if (tipo === "empreendedor") {
        const { Nome, Genero, DataNascimento, BI } = req.body;
        db.query(
          "UPDATE Empreendedor SET Nome = ?, Genero = ?, DataNascimento = ?, BI = ? WHERE UsuarioID = ?",
          [Nome, Genero, DataNascimento, BI, id], // Usa o ID do usuário (id) aqui
          (err, results) => {
            // Remova os parênteses desnecessários aqui
            if (err) {
              console.error("Erro ao atualizar o empreendedor:", err);
              return res
                .status(500)
                .json({ error: "Erro ao atualizar o empreendedor" });
            }
            return res.json({ message: "Atualização realizada com sucesso" });
          }
        );
      }
      // Se o tipo de usuário não for empresa ou empreendedor, apenas atualiza os dados do usuário
      else {
        return res.json({ message: "Atualização realizada com sucesso" });
      }
    }
  );
});

// Rota para obter os dados do usuário logado
app.get("/usuarios/", (req, res) => {
  // Verifica se o token está presente e se é válido
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // Separa o token do prefixo Bearer
  const tokenWithoutBearer = token.replace("Bearer ", "");

  // Verifica o token
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Obter o ID do usuário
    const userId = decoded.userId;

    // Consultar os dados do usuário no banco de dados
    db.query("SELECT * FROM Usuario WHERE id = ?", [userId], (err, results) => {
      if (err) {
        console.error("Erro ao obter os dados do usuário:", err);
        return res
          .status(500)
          .json({ error: "Erro ao obter os dados do usuário" });
      }

      // Retornar os dados do usuário
      const usuario = results[0];

      // Verificar se o usuário é uma empresa ou empreendedor
      if (usuario.tipo == "empresa") {
        db.query(
          "SELECT * FROM Empresa WHERE UsuarioID = ?",
          [userId],
          (err, results) => {
            if (err) {
              console.error("Erro ao obter os dados da empresa:", err);
              return res
                .status(500)
                .json({ error: "Erro ao obter os dados da empresa" });
            }
            // Adicionar dados da empresa ao objeto do usuário
            usuario.company = results[0];
            console.log(results);

            // Retorna o usuario completo após adicionar os dados da empresa
            return res.json(usuario);
          }
        );
      } else {
        db.query(
          "SELECT * FROM Empreendedor WHERE UsuarioID = ?",
          [userId],
          (err, results) => {
            if (err) {
              console.error("Erro ao obter os dados do empreendedor:", err);
              return res
                .status(500)
                .json({ error: "Erro ao obter os dados do empreendedor" });
            }
            // Adicionar dados do empreendedor ao objeto do usuário
            usuario.entrepreneur = results[0];

            // Retorna o usuario completo após adicionar os dados do empreendedor
            return res.json(usuario);
          }
        );
      }
    });
  });
});

// 2. Empresas

// GET /empresas - Retorna todas as empresas
app.get("/empresas", (req, res) => {
  db.query("SELECT * FROM Empresa", (err, results) => {
    if (err) {
      console.error("Erro ao obter as empresas:", err);
      res.status(500).json({ error: "Erro ao obter as empresas" });
      return;
    }
    res.json(results);
  });
});

// GET /empresas/:id - Retorna uma empresa específica pelo ID
app.get("/empresas/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Empresa WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter a empresa:", err);
      res.status(500).json({ error: "Erro ao obter a empresa" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Empresa não encontrada" });
      return;
    }
    res.json(results[0]);
  });
});

// PUT /empresas/:id - Atualiza uma empresa existente
app.put("/empresas/:id", (req, res) => {
  const id = req.params.id;
  const { NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia, UsuarioID } =
    req.body;
  db.query(
    "UPDATE Empresa SET NomeRepresentante = ?, NomeEmpresa = ?, NIF = ?, AnosDeExistencia = ?, UsuarioID = ? WHERE id = ?",
    [NomeRepresentante, NomeEmpresa, NIF, AnosDeExistencia, UsuarioID, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a empresa:", err);
        res.status(500).json({ error: "Erro ao atualizar a empresa" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Empresa não encontrada" });
        return;
      }
      res.json({ message: "Empresa atualizada com sucesso" });
    }
  );
});

// DELETE /empresas/:id - Exclui uma empresa existente
app.delete("/empresas/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Empresa WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a empresa:", err);
      res.status(500).json({ error: "Erro ao excluir a empresa" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Empresa não encontrada" });
      return;
    }
    res.json({ message: "Empresa excluída com sucesso" });
  });
});

// 3. Empreendedores

// GET /empreendedores - Retorna todos os empreendedores
app.get("/empreendedores", (req, res) => {
  db.query("SELECT * FROM Empreendedor", (err, results) => {
    if (err) {
      console.error("Erro ao obter os empreendedores:", err);
      res.status(500).json({ error: "Erro ao obter os empreendedores" });
      return;
    }
    res.json(results);
  });
});

// GET /empreendedores/:id - Retorna um empreendedor específico pelo ID
app.get("/empreendedores/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Empreendedor WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o empreendedor:", err);
      res.status(500).json({ error: "Erro ao obter o empreendedor" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Empreendedor não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// PUT /empreendedores/:id - Atualiza um empreendedor existente
app.put("/empreendedores/:id", (req, res) => {
  const id = req.params.id;
  const { Nome, Genero, DataNascimento, BI, UsuarioID } = req.body;
  db.query(
    "UPDATE Empreendedor SET Nome = ?, Genero = ?, DataNascimento = ?, BI = ?, UsuarioID = ? WHERE id = ?",
    [Nome, Genero, DataNascimento, BI, UsuarioID, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o empreendedor:", err);
        res.status(500).json({ error: "Erro ao atualizar o empreendedor" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Empreendedor não encontrado" });
        return;
      }
      res.json({ message: "Empreendedor atualizado com sucesso" });
    }
  );
});

// DELETE /empreendedores/:id - Exclui um empreendedor existente
app.delete("/empreendedores/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Empreendedor WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir o empreendedor:", err);
      res.status(500).json({ error: "Erro ao excluir o empreendedor" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Empreendedor não encontrado" });
      return;
    }
    res.json({ message: "Empreendedor excluído com sucesso" });
  });
});

// 4. Serviços

// GET /servicos - Retorna todos os serviços
app.get("/servicos", (req, res) => {
  db.query("SELECT * FROM Servicos", (err, results) => {
    if (err) {
      console.error("Erro ao obter os serviços:", err);
      res.status(500).json({ error: "Erro ao obter os serviços" });
      return;
    }
    res.json(results);
  });
});

// GET /servicos/:id - Retorna um serviço específico pelo ID
app.get("/servicos/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Servicos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o serviço:", err);
      res.status(500).json({ error: "Erro ao obter o serviço" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Serviço não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /servicos - Cria um novo serviço
app.post("/servicos", (req, res) => {
  const { Descricao, Preco, CategoriaID, UsuarioID, Foto } = req.body;
  db.query(
    "INSERT INTO Servicos (Descricao, Preco, CategoriaID, UsuarioID, Foto) VALUES (?, ?, ?, ?, ?)",
    [Descricao, Preco, CategoriaID, UsuarioID, Foto],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o serviço:", err);
        res.status(500).json({ error: "Erro ao criar o serviço" });
        return;
      }
      res
        .status(201)
        .json({ message: "Serviço criado com sucesso", id: results.insertId });
    }
  );
});

// PUT /servicos/:id - Atualiza um serviço existente
app.put("/servicos/:id", (req, res) => {
  const id = req.params.id;
  const { Descricao, Preco, CategoriaID, UsuarioID, Foto } = req.body;
  db.query(
    "UPDATE Servicos SET Descricao = ?, Preco = ?, CategoriaID = ?, UsuarioID = ?, Foto = ? WHERE id = ?",
    [Descricao, Preco, CategoriaID, UsuarioID, Foto, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o serviço:", err);
        res.status(500).json({ error: "Erro ao atualizar o serviço" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Serviço não encontrado" });
        return;
      }
      res.json({ message: "Serviço atualizado com sucesso" });
    }
  );
});

// DELETE /servicos/:id - Exclui um serviço existente
app.delete("/servicos/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Servicos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir o serviço:", err);
      res.status(500).json({ error: "Erro ao excluir o serviço" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Serviço não encontrado" });
      return;
    }
    res.json({ message: "Serviço excluído com sucesso" });
  });
});

// 5. Categorias de Serviços

// GET /categorias - Retorna todas as categorias de serviços
app.get("/categorias", (req, res) => {
  db.query("SELECT * FROM CategoriaServico", (err, results) => {
    if (err) {
      console.error("Erro ao obter as categorias de serviços:", err);
      res
        .status(500)
        .json({ error: "Erro ao obter as categorias de serviços" });
      return;
    }
    res.json(results);
  });
});

// GET /categorias/:id - Retorna uma categoria de serviços específica pelo ID
app.get("/categorias/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM CategoriaServico WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter a categoria de serviços:", err);
        res
          .status(500)
          .json({ error: "Erro ao obter a categoria de serviços" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Categoria de serviços não encontrada" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// POST /categorias - Cria uma nova categoria de serviços
app.post("/categorias", (req, res) => {
  const { NomeCategoria, DescricaoCategoria } = req.body;
  db.query(
    "INSERT INTO CategoriaServico (NomeCategoria, DescricaoCategoria) VALUES (?, ?)",
    [NomeCategoria, DescricaoCategoria],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar a categoria de serviços:", err);
        res
          .status(500)
          .json({ error: "Erro ao criar a categoria de serviços" });
        return;
      }
      res.status(201).json({
        message: "Categoria de serviços criada com sucesso",
        id: results.insertId,
      });
    }
  );
});

// PUT /categorias/:id - Atualiza uma categoria de serviços existente
app.put("/categorias/:id", (req, res) => {
  const id = req.params.id;
  const { NomeCategoria, DescricaoCategoria } = req.body;
  db.query(
    "UPDATE CategoriaServico SET NomeCategoria = ?, DescricaoCategoria = ? WHERE id = ?",
    [NomeCategoria, DescricaoCategoria, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a categoria de serviços:", err);
        res
          .status(500)
          .json({ error: "Erro ao atualizar a categoria de serviços" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Categoria de serviços não encontrada" });
        return;
      }
      res.json({ message: "Categoria de serviços atualizada com sucesso" });
    }
  );
});

// DELETE /categorias/:id - Exclui uma categoria de serviços existente
app.delete("/categorias/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM CategoriaServico WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao excluir a categoria de serviços:", err);
        res
          .status(500)
          .json({ error: "Erro ao excluir a categoria de serviços" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Categoria de serviços não encontrada" });
        return;
      }
      res.json({ message: "Categoria de serviços excluída com sucesso" });
    }
  );
});

// 6. Avaliações

// GET /avaliacoes - Retorna todas as avaliações
app.get("/avaliacoes", (req, res) => {
  db.query("SELECT * FROM Avaliacao", (err, results) => {
    if (err) {
      console.error("Erro ao obter as avaliações:", err);
      res.status(500).json({ error: "Erro ao obter as avaliações" });
      return;
    }
    res.json(results);
  });
});

// GET /avaliacoes/:id - Retorna uma avaliação específica pelo ID
app.get("/avaliacoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Avaliacao WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter a avaliação:", err);
      res.status(500).json({ error: "Erro ao obter a avaliação" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Avaliação não encontrada" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /avaliacoes - Cria uma nova avaliação
app.post("/avaliacoes", (req, res) => {
  const { Nota, Comentario, UsuarioID, ServicoID } = req.body;
  db.query(
    "INSERT INTO Avaliacao (Nota, Comentario, UsuarioID, ServicoID) VALUES (?, ?, ?, ?)",
    [Nota, Comentario, UsuarioID, ServicoID],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar a avaliação:", err);
        res.status(500).json({ error: "Erro ao criar a avaliação" });
        return;
      }
      res.status(201).json({
        message: "Avaliação criada com sucesso",
        id: results.insertId,
      });
    }
  );
});

// PUT /avaliacoes/:id - Atualiza uma avaliação existente
app.put("/avaliacoes/:id", (req, res) => {
  const id = req.params.id;
  const { Nota, Comentario, UsuarioID, ServicoID } = req.body;
  db.query(
    "UPDATE Avaliacao SET Nota = ?, Comentario = ?, UsuarioID = ?, ServicoID = ? WHERE id = ?",
    [Nota, Comentario, UsuarioID, ServicoID, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a avaliação:", err);
        res.status(500).json({ error: "Erro ao atualizar a avaliação" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Avaliação não encontrada" });
        return;
      }
      res.json({ message: "Avaliação atualizada com sucesso" });
    }
  );
});

// DELETE /avaliacoes/:id - Exclui uma avaliação existente
app.delete("/avaliacoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Avaliacao WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a avaliação:", err);
      res.status(500).json({ error: "Erro ao excluir a avaliação" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Avaliação não encontrada" });
      return;
    }
    res.json({ message: "Avaliação excluída com sucesso" });
  });
});

// 7. Feedback

// GET /feedback - Retorna todos os feedbacks
app.get("/feedback", (req, res) => {
  db.query("SELECT * FROM Feedback", (err, results) => {
    if (err) {
      console.error("Erro ao obter os feedbacks:", err);
      res.status(500).json({ error: "Erro ao obter os feedbacks" });
      return;
    }
    res.json(results);
  });
});

// GET /feedback/:id - Retorna um feedback específico pelo ID
app.get("/feedback/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Feedback WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o feedback:", err);
      res.status(500).json({ error: "Erro ao obter o feedback" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Feedback não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /feedback - Cria um novo feedback
app.post("/feedback", (req, res) => {
  const { Comentario, Data, AvaliacaoID } = req.body;
  db.query(
    "INSERT INTO Feedback (Comentario, Data, AvaliacaoID) VALUES (?, ?, ?)",
    [Comentario, Data, AvaliacaoID],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o feedback:", err);
        res.status(500).json({ error: "Erro ao criar o feedback" });
        return;
      }
      res
        .status(201)
        .json({ message: "Feedback criado com sucesso", id: results.insertId });
    }
  );
});

// PUT /feedback/:id - Atualiza um feedback existente
app.put("/feedback/:id", (req, res) => {
  const id = req.params.id;
  const { Comentario, Data, AvaliacaoID } = req.body;
  db.query(
    "UPDATE Feedback SET Comentario = ?, Data = ?, AvaliacaoID = ? WHERE id = ?",
    [Comentario, Data, AvaliacaoID, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o feedback:", err);
        res.status(500).json({ error: "Erro ao atualizar o feedback" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Feedback não encontrado" });
        return;
      }
      res.json({ message: "Feedback atualizado com sucesso" });
    }
  );
});

// DELETE /feedback/:id - Exclui um feedback existente
app.delete("/feedback/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Feedback WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir o feedback:", err);
      res.status(500).json({ error: "Erro ao excluir o feedback" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Feedback não encontrado" });
      return;
    }
    res.json({ message: "Feedback excluído com sucesso" });
  });
});

// 8. Sala de Negócios

// GET /salas - Retorna todas as salas de negócios
app.get("/salas", (req, res) => {
  db.query("SELECT * FROM SalaDeNegocios", (err, results) => {
    if (err) {
      console.error("Erro ao obter as salas de negócios:", err);
      res.status(500).json({ error: "Erro ao obter as salas de negócios" });
      return;
    }
    res.json(results);
  });
});

// GET /salas/:id - Retorna uma sala de negócios específica pelo ID
app.get("/salas/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM SalaDeNegocios WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter a sala de negócios:", err);
        res.status(500).json({ error: "Erro ao obter a sala de negócios" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Sala de negócios não encontrada" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// POST /salas - Cria uma nova sala de negócios
app.post("/salas", (req, res) => {
  const { Titulo, Descricao, Link, Anexos, UsuarioID } = req.body;
  db.query(
    "INSERT INTO SalaDeNegocios (Titulo, Descricao, Link, Anexos, UsuarioID) VALUES (?, ?, ?, ?, ?)",
    [Titulo, Descricao, Link, Anexos, UsuarioID],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar a sala de negócios:", err);
        res.status(500).json({ error: "Erro ao criar a sala de negócios" });
        return;
      }
      res.status(201).json({
        message: "Sala de negócios criada com sucesso",
        id: results.insertId,
      });
    }
  );
});

// PUT /salas/:id - Atualiza uma sala de negócios existente
app.put("/salas/:id", (req, res) => {
  const id = req.params.id;
  const { Titulo, Descricao, Link, Anexos, UsuarioID } = req.body;
  db.query(
    "UPDATE SalaDeNegocios SET Titulo = ?, Descricao = ?, Link = ?, Anexos = ?, UsuarioID = ? WHERE id = ?",
    [Titulo, Descricao, Link, Anexos, UsuarioID, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a sala de negócios:", err);
        res.status(500).json({ error: "Erro ao atualizar a sala de negócios" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Sala de negócios não encontrada" });
        return;
      }
      res.json({ message: "Sala de negócios atualizada com sucesso" });
    }
  );
});

// DELETE /salas/:id - Exclui uma sala de negócios existente
app.delete("/salas/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM SalaDeNegocios WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a sala de negócios:", err);
      res.status(500).json({ error: "Erro ao excluir a sala de negócios" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Sala de negócios não encontrada" });
      return;
    }
    res.json({ message: "Sala de negócios excluída com sucesso" });
  });
});

// 9. Participação

// GET /participacoes - Retorna todas as participações
app.get("/participacoes", (req, res) => {
  db.query("SELECT * FROM Participacao", (err, results) => {
    if (err) {
      console.error("Erro ao obter as participações:", err);
      res.status(500).json({ error: "Erro ao obter as participações" });
      return;
    }
    res.json(results);
  });
});

// GET /participacoes/:id - Retorna uma participação específica pelo ID
app.get("/participacoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Participacao WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter a participação:", err);
      res.status(500).json({ error: "Erro ao obter a participação" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Participação não encontrada" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /participacoes - Cria uma nova participação
app.post("/participacoes", (req, res) => {
  const { UsuarioID, SalaDeNegociosID, DataParticipacao } = req.body;
  db.query(
    "INSERT INTO Participacao (UsuarioID, SalaDeNegociosID, DataParticipacao) VALUES (?, ?, ?)",
    [UsuarioID, SalaDeNegociosID, DataParticipacao],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar a participação:", err);
        res.status(500).json({ error: "Erro ao criar a participação" });
        return;
      }
      res.status(201).json({
        message: "Participação criada com sucesso",
        id: results.insertId,
      });
    }
  );
});

// PUT /participacoes/:id - Atualiza uma participação existente
app.put("/participacoes/:id", (req, res) => {
  const id = req.params.id;
  const { UsuarioID, SalaDeNegociosID, DataParticipacao } = req.body;
  db.query(
    "UPDATE Participacao SET UsuarioID = ?, SalaDeNegociosID = ?, DataParticipacao = ? WHERE id = ?",
    [UsuarioID, SalaDeNegociosID, DataParticipacao, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a participação:", err);
        res.status(500).json({ error: "Erro ao atualizar a participação" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Participação não encontrada" });
        return;
      }
      res.json({ message: "Participação atualizada com sucesso" });
    }
  );
});
// DELETE /participacoes/:id - Exclui uma participação existente
app.delete("/participacoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Participacao WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a participação:", err);
      res.status(500).json({ error: "Erro ao excluir a participação" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Participação não encontrada" });
      return;
    }
    res.json({ message: "Participação excluída com sucesso" });
  });
});

// 10. Conexões

// GET /conexoes - Retorna todas as conexões
app.get("/conexoes", (req, res) => {
  db.query("SELECT * FROM Conexao", (err, results) => {
    if (err) {
      console.error("Erro ao obter as conexões:", err);
      res.status(500).json({ error: "Erro ao obter as conexões" });
      return;
    }
    res.json(results);
  });
});

// GET /conexoes/:id - Retorna uma conexão específica pelo ID
app.get("/conexoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Conexao WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter a conexão:", err);
      res.status(500).json({ error: "Erro ao obter a conexão" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Conexão não encontrada" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /conexoes - Cria uma nova conexão
app.post("/conexoes", (req, res) => {
  const { Usuario1ID, Usuario2ID, DataConexao } = req.body;
  db.query(
    "INSERT INTO Conexao (Usuario1ID, Usuario2ID, DataConexao) VALUES (?, ?, ?)",
    [Usuario1ID, Usuario2ID, DataConexao],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar a conexão:", err);
        res.status(500).json({ error: "Erro ao criar a conexão" });
        return;
      }
      res
        .status(201)
        .json({ message: "Conexão criada com sucesso", id: results.insertId });
    }
  );
});

// PUT /conexoes/:id - Atualiza uma conexão existente
app.put("/conexoes/:id", (req, res) => {
  const id = req.params.id;
  const { Usuario1ID, Usuario2ID, DataConexao } = req.body;
  db.query(
    "UPDATE Conexao SET Usuario1ID = ?, Usuario2ID = ?, DataConexao = ? WHERE id = ?",
    [Usuario1ID, Usuario2ID, DataConexao, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a conexão:", err);
        res.status(500).json({ error: "Erro ao atualizar a conexão" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Conexão não encontrada" });
        return;
      }
      res.json({ message: "Conexão atualizada com sucesso" });
    }
  );
});

// DELETE /conexoes/:id - Exclui uma conexão existente
app.delete("/conexoes/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Conexao WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a conexão:", err);
      res.status(500).json({ error: "Erro ao excluir a conexão" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Conexão não encontrada" });
      return;
    }
    res.json({ message: "Conexão excluída com sucesso" });
  });
});

// 11. Mensagens

// GET /mensagens - Retorna todas as mensagens
app.get("/mensagens", (req, res) => {
  db.query("SELECT * FROM Mensagem", (err, results) => {
    if (err) {
      console.error("Erro ao obter as mensagens:", err);
      res.status(500).json({ error: "Erro ao obter as mensagens" });
      return;
    }
    res.json(results);
  });
});

// GET /mensagens/:id - Retorna uma mensagem específica pelo ID
app.get("/mensagens/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Mensagem WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter a mensagem:", err);
      res.status(500).json({ error: "Erro ao obter a mensagem" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Mensagem não encontrada" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /mensagens - Cria uma nova mensagem
app.post("/mensagens", (req, res) => {
  const { RemetenteID, DestinatarioID, Conteudo, DataEnvio, Lida, Anexos } =
    req.body;
  db.query(
    "INSERT INTO Mensagem (RemetenteID, DestinatarioID, Conteudo, DataEnvio, Lida, Anexos) VALUES (?, ?, ?, ?, ?, ?)",
    [RemetenteID, DestinatarioID, Conteudo, DataEnvio, Lida, Anexos],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar a mensagem:", err);
        res.status(500).json({ error: "Erro ao criar a mensagem" });
        return;
      }
      res
        .status(201)
        .json({ message: "Mensagem criada com sucesso", id: results.insertId });
    }
  );
});

// PUT /mensagens/:id - Atualiza uma mensagem existente
app.put("/mensagens/:id", (req, res) => {
  const id = req.params.id;
  const { RemetenteID, DestinatarioID, Conteudo, DataEnvio, Lida, Anexos } =
    req.body;
  db.query(
    "UPDATE Mensagem SET RemetenteID = ?, DestinatarioID = ?, Conteudo = ?, DataEnvio = ?, Lida = ?, Anexos = ? WHERE id = ?",
    [RemetenteID, DestinatarioID, Conteudo, DataEnvio, Lida, Anexos, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a mensagem:", err);
        res.status(500).json({ error: "Erro ao atualizar a mensagem" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Mensagem não encontrada" });
        return;
      }
      res.json({ message: "Mensagem atualizada com sucesso" });
    }
  );
});

// DELETE /mensagens/:id - Exclui uma mensagem existente
app.delete("/mensagens/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Mensagem WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a mensagem:", err);
      res.status(500).json({ error: "Erro ao excluir a mensagem" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Mensagem não encontrada" });
      return;
    }
    res.json({ message: "Mensagem excluída com sucesso" });
  });
});

// 12. Eventos

// GET /eventos - Retorna todos os eventos
app.get("/eventos", (req, res) => {
  db.query("SELECT * FROM Eventos", (err, results) => {
    if (err) {
      console.error("Erro ao obter os eventos:", err);
      res.status(500).json({ error: "Erro ao obter os eventos" });
      return;
    }
    res.json(results);
  });
});

// GET /eventos/:id - Retorna um evento específico pelo ID
app.get("/eventos/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Eventos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o evento:", err);
      res.status(500).json({ error: "Erro ao obter o evento" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /eventos - Cria um novo evento
app.post("/eventos", (req, res) => {
  const { Nome, Data, Time, Local, UsuarioID, Description } = req.body;
  db.query(
    "INSERT INTO Eventos (Nome, Data, Time, Local, UsuarioID, Description) VALUES (?, ?, ?, ?, ?, ?)",
    [Nome, Data, Time, Local, UsuarioID, Description],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o evento:", err);
        res.status(500).json({ error: "Erro ao criar o evento" });
        return;
      }
      res
        .status(201)
        .json({ message: "Evento criado com sucesso", id: results.insertId });
    }
  );
});

// PUT /eventos/:id - Atualiza um evento existente
app.put("/eventos/:id", (req, res) => {
  const id = req.params.id;
  const { Nome, Data, Time, Local, UsuarioID, Description } = req.body;
  db.query(
    "UPDATE Eventos SET Nome = ?, Data = ?, Time = ? Local = ?, UsuarioID = ?, Description = ? WHERE id = ?",
    [Nome, Data, Time, Local, UsuarioID, Description],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o evento:", err);
        res.status(500).json({ error: "Erro ao atualizar o evento" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Evento não encontrado" });
        return;
      }
      res.json({ message: "Evento atualizado com sucesso" });
    }
  );
});

// DELETE /eventos/:id - Exclui um evento existente
app.delete("/eventos/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Eventos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir o evento:", err);
      res.status(500).json({ error: "Erro ao excluir o evento" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }
    res.json({ message: "Evento excluído com sucesso" });
  });
});

// 13. Administradores

// GET /administradores - Retorna todos os administradores
app.get("/administradores", (req, res) => {
  db.query("SELECT * FROM Administrador", (err, results) => {
    if (err) {
      console.error("Erro ao obter os administradores:", err);
      res.status(500).json({ error: "Erro ao obter os administradores" });
      return;
    }
    res.json(results);
  });
});

// GET /administradores/:id - Retorna um administrador específico pelo ID
app.get("/administradores/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Administrador WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o administrador:", err);
      res.status(500).json({ error: "Erro ao obter o administrador" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Administrador não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /administradores - Cria um novo administrador
app.post("/administradores", (req, res) => {
  const { Nome, Genero, Email, Senha } = req.body;
  db.query(
    "INSERT INTO Administrador (Nome, Genero, Email, Senha) VALUES (?, ?, ?, ?)",
    [Nome, Genero, Email, Senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o administrador:", err);
        res.status(500).json({ error: "Erro ao criar o administrador" });
        return;
      }
      res.status(201).json({
        message: "Administrador criado com sucesso",
        id: results.insertId,
      });
    }
  );
});

// PUT /administradores/:id - Atualiza um administrador existente
app.put("/administradores/:id", (req, res) => {
  const id = req.params.id;
  const { Nome, Genero, Email, Senha } = req.body;
  db.query(
    "UPDATE Administrador SET Nome = ?, Genero = ?, Email = ?, Senha = ? WHERE id = ?",
    [Nome, Genero, Email, Senha, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o administrador:", err);
        res.status(500).json({ error: "Erro ao atualizar o administrador" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Administrador não encontrado" });
        return;
      }
      res.json({ message: "Administrador atualizado com sucesso" });
    }
  );
});

// DELETE /administradores/:id - Exclui um administrador existente
app.delete("/administradores/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Administrador WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir o administrador:", err);
      res.status(500).json({ error: "Erro ao excluir o administrador" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Administrador não encontrado" });
      return;
    }
    res.json({ message: "Administrador excluído com sucesso" });
  });
});

// 14. Postagens

app.get("/postagens", (req, res) => {
  // Verifique se o token está presente
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  console.log("Token recebido:", token);
  console.log("Cabeçalho da Requisição:", {
    Authorization: `Bearer ${token}`,
  });
  // Separa o token do prefixo Bearer
  const tokenWithoutBearer = token.replace("Bearer ", "");

  // Verifica o token e extrai o ID do usuário
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Consulta todas as postagens
    db.query("SELECT * FROM Postagem", (err, results) => {
      if (err) {
        console.error("Erro ao obter as postagens:", err);
        res.status(500).json({ error: "Erro ao obter as postagens" });
        return;
      }

      // Adiciona o nome do autor a cada postagem
      const postsComAutor = results.map((post) => {
        return new Promise((resolve, reject) => {
          // Consulta para o nome do autor baseado no tipo
          db.query(
            `SELECT 
                      CASE
                          WHEN p.tipo = 'empreendedor' THEN e.Nome
                          WHEN p.tipo = 'empresa' THEN em.NomeEmpresa
                          ELSE NULL
                      END AS Nome, 
                      p.tipo
                    FROM Postagem p
                    LEFT JOIN Empreendedor e ON p.UsuarioID = e.UsuarioID
                    LEFT JOIN Empresa em ON p.UsuarioID = em.UsuarioID
                    WHERE p.id = ?`,
            [post.id],
            (err, autorResults) => {
              if (err) {
                console.error("Erro ao obter o nome do autor:", err);
                reject(err);
              } else {
                post.author = {
                  name: autorResults[0].Nome,
                  tipo: autorResults[0].tipo,
                };
                resolve(post);
              }
            }
          );
        });
      });

      // Resolve todas as promessas para obter os posts com autor
      Promise.all(postsComAutor)
        .then((postsComAutor) => {
          res.json(postsComAutor);
        })
        .catch((err) => {
          console.error("Erro ao obter posts com autor:", err);
          res.status(500).json({ error: "Erro ao obter posts com autor" });
        });
    });
  });
});
// GET /postagens/:id - Retorna uma postagem específica pelo ID
app.get("/postagens/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Postagem WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter a postagem:", err);
      res.status(500).json({ error: "Erro ao obter a postagem" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Postagem não encontrada" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /postagens - Cria uma nova postagem
app.post("/postagens", (req, res) => {
  const { Conteudo, Foto } = req.body;

  // Verifique se o token está presente
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // Separa o token do prefixo Bearer
  const tokenWithoutBearer = token.replace("Bearer ", "");

  // Verifica o token e extrai o ID do usuário
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const UsuarioID = decoded.userId; // Obteve o ID do usuário

    // Insere a postagem com Data atual
    const Data = new Date(); // Obtém a data e hora atuais

    // Agora você pode usar o UsuarioID na sua consulta SQL
    db.query(
      "INSERT INTO Postagem (Conteudo, Data, UsuarioID, Foto) VALUES (?, ?, ?, ?)",
      [Conteudo, Data, UsuarioID, Foto],
      (err, results) => {
        if (err) {
          console.error("Erro ao criar a postagem:", err);
          res.status(500).json({ error: "Erro ao criar a postagem" });
          return;
        }
        res.status(201).json({
          message: "Postagem criada com sucesso",
          id: results.insertId,
        });
      }
    );
  });
});
// PUT /postagens/:id - Atualiza uma postagem existente
app.put("/postagens/:id", (req, res) => {
  const id = req.params.id;
  const { Conteudo, Data, UsuarioID, Foto } = req.body;
  db.query(
    "UPDATE Postagem SET Conteudo = ?, Data = ?, UsuarioID = ?, Foto = ? WHERE id = ?",
    [Conteudo, Data, UsuarioID, Foto, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar a postagem:", err);
        res.status(500).json({ error: "Erro ao atualizar a postagem" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Postagem não encontrada" });
        return;
      }
      res.json({ message: "Postagem atualizada com sucesso" });
    }
  );
});

// DELETE /postagens/:id - Exclui uma postagem existente
app.delete("/postagens/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Postagem WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir a postagem:", err);
      res.status(500).json({ error: "Erro ao excluir a postagem" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Postagem não encontrada" });
      return;
    }
    res.json({ message: "Postagem excluída com sucesso" });
  });
});

// Iniciando o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

// 15. Startup

// GET /Startup - Retorna todos os Startup
app.get("/startup", (req, res) => {
  db.query("SELECT * FROM Startup", (err, results) => {
    if (err) {
      console.error("Erro ao obter os Startup:", err);
      res.status(500).json({ error: "Erro ao obter os Startup" });
      return;
    }
    res.json(results);
  });
});

// GET /Startup/:id - Retorna um evento específico pelo ID
app.get("/startup/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Startup WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter o evento:", err);
      res.status(500).json({ error: "Erro ao obter o evento" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }
    res.json(results[0]);
  });
});

// POST /Startup - Cria um novo evento
app.post("/startup", (req, res) => {
  const { Name, Description, UsuarioID } = req.body;
  db.query(
    "INSERT INTO Startup (name, description, UsuarioID) VALUES (?, ?, ?)",
    [Name, Description, UsuarioID],
    (err, results) => {
      if (err) {
        console.error("Erro ao criar o evento:", err);
        res.status(500).json({ error: "Erro ao criar o evento" });
        return;
      }
      res
        .status(201)
        .json({ message: "Evento criado com sucesso", id: results.insertId });
    }
  );
});

// PUT /Startup/:id - Atualiza um evento existente
app.put("/startup/:id", (req, res) => {
  const id = req.params.id;
  const { Name, Description, UsuarioID } = req.body;
  db.query(
    "UPDATE Startup SET name = ?, description = ?, UsuarioID = ? WHERE id = ?",
    [Name, Description, UsuarioID],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar o evento:", err);
        res.status(500).json({ error: "Erro ao atualizar o evento" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Evento não encontrado" });
        return;
      }
      res.json({ message: "Evento atualizado com sucesso" });
    }
  );
});

// DELETE /Startup/:id - Exclui um evento existente
app.delete("/startup/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Startup WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir o evento:", err);
      res.status(500).json({ error: "Erro ao excluir o evento" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }
    res.json({ message: "Evento excluído com sucesso" });
  });
});
