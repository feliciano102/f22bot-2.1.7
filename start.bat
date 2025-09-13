@echo off
setlocal enabledelayedexpansion

:: Script de inicialização para KnightBot-MD
echo Iniciando KnightBot-MD...

:: Verifica se o Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Node.js nao encontrado. Por favor, instale o Node.js para continuar.
    pause
    exit /b 1
)

:: Verifica se as dependências estão instaladas
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

:: Opções de inicialização
echo Escolha uma opcao de inicializacao:
echo 1. Iniciar normalmente
echo 2. Iniciar com otimizacao de memoria
echo 3. Limpar e iniciar
echo 4. Resetar sessao e iniciar
set /p option="Opcao (1-4): "

if "%option%"=="1" (
    echo Iniciando bot normalmente...
    call npm start
) else if "%option%"=="2" (
    echo Iniciando bot com otimizacao de memoria...
    call npm run start:optimized
) else if "%option%"=="3" (
    echo Limpando e iniciando bot...
    call npm run start:clean
) else if "%option%"=="4" (
    echo Resetando sessao e iniciando bot...
    call npm run start:fresh
) else (
    echo Opcao invalida. Iniciando normalmente...
    call npm start
)

pause