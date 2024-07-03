import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const register = async (req, res) => {
    const { username, email, password, schoolId } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log(hashedPassword);
    //Verificar que no haya otro usuario
    try {
    const [userFound] = await db.execute('SELECT * FROM alumnos WHERE correo_A = ?', [email]);
    if (userFound.length > 0) {
        return res.status(400).json({
          message: ["The email is already in use"],
        });
    }

    
      // Ejecutar la consulta
      const [result] = await db.execute(
        'INSERT INTO alumnos (nombre_A, correo_A, contrasena_A, id_escuela_A) VALUES (?, ?, ?, ?)', 
        [username, email, hashedPassword, schoolId]
    );

    // Comprobar si el usuario fue creado correctamente
    if (result.affectedRows === 1) {
      res.status(200).send('User registered');
    } else {
      res.status(500).send('Error registering user');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error registering user');
  }
};

export const login = async (req, res) => {
    const { email, password, } = req.body;
  
    try {
      const [rows] = await db.execute('SELECT * FROM alumnos WHERE correo_A = ?', [email]);
      if (rows.length === 0) return res.status(404).send('No user found');
  
      const user = rows[0];
      console.log(user);
      const passwordIsValid = bcrypt.compareSync(password, user.contrasena_A);
  
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
      const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: 86400 }); // 24 hours
  
      res.status(200).send({ auth: true, token });
    } catch (err) {
      console.log(err)
      res.status(500).send('Error on the server');
    }
  };

  export const logout = async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };