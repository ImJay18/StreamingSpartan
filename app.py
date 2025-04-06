from http.server import SimpleHTTPRequestHandler, HTTPServer
import os

class MiServidor(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Rutas amigables sin extensión
        if self.path == '/' or self.path == '/index.html':
            self.path = 'index.html'
        elif self.path == '/nuestros-servicios' or self.path == '/nuestros-servicios.html':
            self.path = 'nuestros-servicios.html'
        elif self.path == '/distribuidores' or self.path == '/distribuidores.html':
            self.path = 'distribuidores.html'
        
        # Archivos estáticos desde carpetas
        #elif self.path.startswith('/Style - SP/'):
        #    self.path = "Style - SP/" + self.path[len("/Style - SP/"):]
        #elif self.path.startswith('/Imagenes/'):
        #    self.path = "Imagenes/" + self.path[len("/Imagenes/"):]
        #elif self.path.startswith('/script/'):
        #    self.path = "script/" + self.path[len("/script/"):]
        #elif self.path.startswith('/navbar/'):
        #    self.path = "navbar/" + self.path[len("/navbar/"):]
        #elif self.path.startswith('/Pages/'):
        #    self.path = "Pages/" + self.path[len("/Pages/"):]
       
        # Si el archivo existe, servirlo
        if os.path.exists(self.path):
            return super().do_GET()
    

        else:
            # Página de error 404 personalizada
            self.path = '/Pages/404.html'
            return super().do_GET()

# Inicia el servidor
server = HTTPServer(('localhost', 8080), MiServidor)
print("Servidor iniciado en http://localhost:8080")
server.serve_forever()
