const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Goodbless@2024', // Substitua com sua senha
  database: 'testes'  // Substitua com o nome do seu banco de dados
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para registro de empresa
app.post('/register/empresa', (req, res) => {
  const {
    email,
    password,
    telefone,
    provincia,
    area_atuacao,
    profile_image,
    coverImage,
    title,
    nome_empresa,
    nif_empresa,
    nome_representante,
    ano_existencia
  } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.error('Erro ao iniciar transação:', err);
      return res.status(500).send('Erro ao iniciar transação');
    }

    const insertUserQuery = 'INSERT INTO usuario (email, password, telefone, provincia, area_atuacao, profile_image, cover_image, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [email, password, telefone, provincia, area_atuacao, profile_image, coverImage, title], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados na tabela usuario:', err);
        return db.rollback(() => {
          res.status(500).send('Erro ao inserir dados na tabela usuario');
        });
      }

      const userId = result.insertId;
      const insertCompanyQuery = 'INSERT INTO empresa (user_id, nome_empresa, nif_empresa, nome_representante, ano_existencia) VALUES (?, ?, ?, ?, ?)';
      db.query(insertCompanyQuery, [userId, nome_empresa, nif_empresa, nome_representante, ano_existencia], (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados na tabela empresa:', err);
          return db.rollback(() => {
            res.status(500).send('Erro ao inserir dados na tabela empresa');
          });
        }

        db.commit(err => {
          if (err) {
            console.error('Erro ao finalizar transação:', err);
            return db.rollback(() => {
              res.status(500).send('Erro ao finalizar transação');
            });
          }

          res.status(200).send({ message: 'Empresa registrada com sucesso' });
        });
      });
    });
  });
});

// Endpoint para registro de empreendedor
app.post('/register/empreendedor', (req, res) => {
  const {
    email,
    password,
    telefone,
    provincia,
    area_atuacao,
    profile_image,
    cover_image,
    title,
    bi,
    nome,
    data_nascimento,
    genero
  } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.error('Erro ao iniciar transação:', err);
      return res.status(500).send('Erro ao iniciar transação');
    }

    const insertUserQuery = 'INSERT INTO usuario (email, password, telefone, provincia, area_atuacao, profile_image, cover_image, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [email, password, telefone, provincia, area_atuacao, profile_image, cover_image, title], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados na tabela usuario:', err);
        return db.rollback(() => {
          res.status(500).send('Erro ao inserir dados na tabela usuario');
        });
      }

      const userId = result.insertId;
      const insertEntrepreneurQuery = 'INSERT INTO empreendedor (user_id, bi, nome, data_nascimento, genero) VALUES (?, ?, ?, ?, ?)';
      db.query(insertEntrepreneurQuery, [userId, bi, nome, data_nascimento, genero], (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados na tabela empreendedor:', err);
          return db.rollback(() => {
            res.status(500).send('Erro ao inserir dados na tabela empreendedor');
          });
        }

        db.commit(err => {
          if (err) {
            console.error('Erro ao finalizar transação:', err);
            return db.rollback(() => {
              res.status(500).send('Erro ao finalizar transação');
            });
          }

          res.status(200).send({ message: 'Empreendedor registrado com sucesso' });
        });
      });
    });
  });
});


// Endpoint para login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT id, email FROM usuario WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro ao executar consulta de login: ', err);
      return res.status(500).send('Erro ao realizar login');
    }

    if (results.length === 0) {
      return res.status(401).send('Credenciais inválidas');
    }

    const user = results[0];
    res.status(200).send({ message: 'Login bem sucedido', userId: user.id });
  });
});


// Endpoint para obter dados do usuário logado
app.get('/userdata', (req, res) => {
  const userId = req.query.userId;

  const userQuery = `
    SELECT 
      u.email, 
      u.telefone, 
      u.provincia, 
      u.area_atuacao,
      u.profile_image,
      u.cover_image,
      u.title, 
      e.nome_empresa, 
      e.nome_representante,
      e.nif_empresa, 
      e.ano_existencia,
      ep.nome,
      ep.data_nascimento,
      ep.genero,
      ep.bi
    FROM usuario u
    LEFT JOIN empresa e ON u.id = e.user_id
    LEFT JOIN empreendedor ep ON u.id = ep.user_id
    WHERE u.id = ?
  `;

  db.query(userQuery, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do usuário: ', err);
      return res.status(500).send('Erro ao buscar dados do usuário');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    const user = results[0];
    
    // Convertendo a data para string no formato ISO (ou outro formato, se necessário)
    const dataNascimento = user.data_nascimento ? new Date(user.data_nascimento).toISOString().split('T')[0] : null;

    const responseData = {
      email: user.email,
      telefone: user.telefone,
      provincia: user.provincia,
      area_atuacao: user.area_atuacao,
      profile_image: user.profile_image,
      cover_image: user.cover_image,
      title: user.title,
      company: user.nome_empresa ? { 
        nome_empresa: user.nome_empresa,
        nome_representante: user.nome_representante,
        nif_empresa: user.nif_empresa,
        ano_existencia: user.ano_existencia
      } : null,
      entrepreneur: user.nome ? { 
        nome: user.nome,
        data_nascimento: dataNascimento,
        genero: user.genero,
        bi: user.bi
      } : null
    };

    res.status(200).send(responseData);
  });
});

// Endpoint para atualizar perfil de empresa
app.put('/update/profile/empresa', (req, res) => {
  const {
    userId,
    email,
    telefone,
    provincia,
    areaAtuacao,
    profile_image,
    cover_image,
    title,
    nome_empresa,
    nif_empresa,
    nome_representante,
    ano_existencia
  } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.error('Erro ao iniciar transação:', err);
      return res.status(500).send('Erro ao iniciar transação');
    }

    const updateUserQuery = 'UPDATE usuario SET email = ?, telefone = ?, provincia = ?, area_atuacao = ?, profile_image = ?, cover_image = ?, title = ? WHERE id = ?';
    db.query(updateUserQuery, [email, telefone, provincia, areaAtuacao, profile_image, cover_image, title, userId], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar dados na tabela usuario:', err);
        return db.rollback(() => {
          res.status(500).send('Erro ao atualizar dados na tabela usuario');
        });
      }

      const updateCompanyQuery = 'UPDATE empresa SET nif_empresa = ?, nome_empresa = ?, nome_representante = ?, ano_existencia = ? WHERE user_id = ?';
      db.query(updateCompanyQuery, [nif_empresa, nome_empresa, nome_representante, ano_existencia, userId], (err, result) => {
        if (err) {
          console.error('Erro ao atualizar dados na tabela empresa:', err);
          return db.rollback(() => {
            res.status(500).send('Erro ao atualizar dados na tabela empresa');
          });
        }

        db.commit(err => {
          if (err) {
            console.error('Erro ao finalizar transação:', err);
            return db.rollback(() => {
              res.status(500).send('Erro ao finalizar transação');
            });
          }

          res.status(200).send({ message: 'Perfil da empresa atualizado com sucesso' });
        });
      });
    });
  });
});

// Endpoint para atualizar perfil de empreendedor
app.put('/update/profile/empreendedor', (req, res) => {
  const {
    userId,
    email,
    telefone,
    provincia,
    area_atuacao,
    profile_image,
    cover_image,
    title,
    bi,
    nome,
    data_nascimento,
    genero
  } = req.body;

  db.beginTransaction(err => {
    if (err) {
      console.error('Erro ao iniciar transação:', err);
      return res.status(500).send('Erro ao iniciar transação');
    }

    const updateUserQuery = 'UPDATE usuario SET email = ?, telefone = ?, provincia = ?, area_atuacao = ?, profile_image = ?, cover_image = ?, title = ? WHERE id = ?';
    db.query(updateUserQuery, [email, telefone, provincia, area_atuacao, profile_image, cover_image, title, userId], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar dados na tabela usuario:', err);
        return db.rollback(() => {
          res.status(500).send('Erro ao atualizar dados na tabela usuario');
        });
      }

      const updateEntrepreneurQuery = 'UPDATE empreendedor SET bi = ?, nome = ?, data_nascimento = ?, genero = ? WHERE user_id = ?';
      db.query(updateEntrepreneurQuery, [bi, nome, data_nascimento, genero, userId], (err, result) => {
        if (err) {
          console.error('Erro ao atualizar dados na tabela empreendedor:', err);
          return db.rollback(() => {
            res.status(500).send('Erro ao atualizar dados na tabela empreendedor');
          });
        }

        db.commit(err => {
          if (err) {
            console.error('Erro ao finalizar transação:', err);
            return db.rollback(() => {
              res.status(500).send('Erro ao finalizar transação');
            });
          }

          res.status(200).send({ message: 'Perfil do empreendedor atualizado com sucesso' });
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});