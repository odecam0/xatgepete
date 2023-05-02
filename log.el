;; This file is used to log what happens between commits

(code-c-d "xgpt" "~/xatgepete/")

;; (find-xgptfile "")

;; Vou utilizar o meteor porque existe uma vaga de emprego com esse requisito.

;; A tela será dividida em duas partes. Uma pro chat de fato e outra para mudar de contextos e
;; com opções.

;; 1. O layout da tela.
;;    Usarei grid para pegar 2/3 da tela para o chat
;;    e o restante para o contexto.

;; 2. A tela do chat
;;    Terá um pequeno formulário bem embaixo na tela, para enviar as mensagens.
;;    O restante da tela será 

;; export PATH=/home/brnm/.meteor:$PATH
;; https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
;; https://react-tutorial.meteor.com/simple-todos/01-creating-app.html

;  (find-xgptfile "imports/ui/")
;  (find-xgptfile "imports/ui/App.tsx")
(defun a () (interactive) (find-xgptfile "imports/ui/App.tsx"))

;  (find-xgptfile "/client/main.css")
(defun c () (interactive) (find-xgptfile "/client/main.css"))

;; tsc App.tsx --jsx react -w --esModuleInterop true

;; Agora na esquerda preciso fazer um flexbox com um elemento que fica no final com as opções. o
;; , e conterá os botões para outras conversas. Este conteiner com botões para outras conversas será
;; outro flexbox com os item todos no inicio.

;; Na direita o conteiner também precisa ser um flexbox, com um formulário no fim.
;; E depois preciso dar um jeito de fazer uma caixa de mensagens escrolavel. (Não precisa ser hoje)
