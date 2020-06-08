npm i
bash script.sh
node client.js test_user3 < messages.txt &

# NodeJs_chat_server
npm i

# There is a file script.sh, 
    run that bash file by using 'bash script.sh' command
        It will start the server and connect 20 clients(must be registered in script.sh file) in 20 different terminals.
        Now all the clients are ready to communicate with each other
        
# Run `node client.js test_user3 < messages.txt &` 
    This will feed the input to this script and will send to all other clients connected also it will execute some of the linux commands. An empty terminal must be appearing front of you, just copy and paste the above command.

# We know that commands are preceded by a slash, so it's easy to distinguish between the two.
    SO, to run any command please prefix it with /c, /cmd or /command.
        E.g.: 
            * /c npm i express -s
            * /cmd npm i express -s
            * /command npm i express -s
    Every client can see the message shared with each other, but command's response will be see by only client who has instantiated it. An ACk will be shared once the commands completed also a stream will be created for the output and client can see those output.
    
# Patches socket.emit and and socket.on functions to send encrypted and decrypt messages using crypto.
    Public and private keys will be generate as soon as someone will start the server
            

