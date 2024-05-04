// ignore_for_file: prefer_const_constructors

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'register_page.dart';

class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.only(
          top: 60,
          left: 40,
          right: 40,
        ),
        color: Colors.white12,
        child: Form(
          key: _formKey,
          child: ListView(
            children: <Widget>[
              SizedBox(
                width: 224,
                height: 224,
                child: Image(
                  image:
                      AssetImage('assets/images/ecoponto_with_brand_out.png'),
                ),
              ),
              SizedBox(
                height: 4,
              ),
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  hintText: 'email@email.com',
                  labelText: 'E-mail',
                  labelStyle: TextStyle(
                    color: Colors.black38,
                    fontWeight: FontWeight.w400,
                    fontSize: 15,
                  ),
                ),
                style: TextStyle(fontSize: 15),
                validator: (email) {
                  if (email == null || email.isEmpty) {
                    return 'Digite seu e-mail';
                  }
                  return null;
                },
              ),
              SizedBox(
                height: 4,
              ),
              TextFormField(
                controller: _senhaController,
                keyboardType: TextInputType.text,
                obscureText: true,
                decoration: InputDecoration(
                  hintText: 'Digite sua senha',
                  labelText: 'Senha',
                  labelStyle: TextStyle(
                    color: Colors.black38,
                    fontWeight: FontWeight.w400,
                    fontSize: 15,
                  ),
                ),
                style: TextStyle(fontSize: 15),
                validator: (senha) {
                  if (senha == null || senha.isEmpty) {
                    return 'Digite sua senha';
                  }
                  return null;
                },
              ),
              SizedBox(
                height: 4,
              ),
              Container(
                height: 40,
                alignment: Alignment.centerRight,
                child: TextButton(
                  // ignore: avoid_print
                  onPressed: () {},
                  style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all(Colors.black38),
                  ),
                  child: Text(
                    "Recuperar senha",
                  ),
                ),
              ),
              SizedBox(
                height: 60,
              ),
              Container(
                height: 60,
                alignment: Alignment.centerLeft,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    stops: const [0.3, 1],
                    colors: const [
                      Color.fromARGB(100, 86, 171, 47),
                      Color.fromARGB(100, 168, 224, 99),
                    ],
                  ),
                  borderRadius: BorderRadius.all(
                    Radius.circular(25),
                  ),
                ),
                child: SizedBox.expand(
                  child: TextButton(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const <Widget>[
                        Text(
                          ' Login',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                            fontSize: 17,
                          ),
                          textAlign: TextAlign.left,
                        ),
                        SizedBox(
                          height: 28,
                          width: 28,
                          child: Icon(Icons.done),
                        ),
                      ],
                    ),
                    onPressed: () => {
                      if (_formKey.currentState!.validate())
                        {
                          logar(
                            _emailController.text,
                            _senhaController.text,
                          ),
                        },
                    },
                  ),
                ),
              ),
              SizedBox(
                height: 40,
                child: TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => RegisterPage()),
                    );
                  },
                  child: Text(
                    'Cadastre-se',
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> logar(String email, String password) async {
    final response = await http.post(
      Uri.parse('http://10.0.2.2:8000/materials/login/'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
        <String, String>{
          'email': email,
          'password': password,
        },
      ),
    );
    if (response.statusCode == 200) {
      print('Login Successful');
    } else {
      print('Failed to login');
    }
  }
}
