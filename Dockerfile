# 1. Imagem base (O computador virtual)
FROM node:20

# 2. Pasta de trabalho dentro do container
WORKDIR /app

# 3. Copia apenas a "lista de compras" primeiro
COPY package.json package-lock.json ./

# 4. Instala as dependências (React, Vite, MUI, etc.)
RUN npm install

# 5. Copia o resto do código do seu frontend para o container
COPY . .

# 6. Libera a porta padrão que o Vite usa
EXPOSE 5173

# 7. O comando para ligar o frontend
# O "--host" é um truque essencial do Vite no Docker para permitir que 
# o seu navegador no Windows consiga acessar a página!
CMD ["npm", "run", "dev", "--", "--host"]