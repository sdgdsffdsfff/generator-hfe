#!/bin/bash
rm -rf *.zip
echo -e "\033[33m 'gulp' command executed! \033[0m";
gulp;
if [ $? -eq 0 ];then

	BUILD_DIR='build/';
	BUILD_PASSWORD='889aa9c449d5be106c156db6c423e2ed';

	echo -e "\033[33m 'gulp' command completed successfully! \033[0m";
	echo -e "\033[33m '$BUILD_DIR' folder starts to compress! \033[0m";

	pass=$( find $BUILD_DIR -type f | xargs md5 | md5 );
	
	echo $pass;
	gulp modify-offline-json --name $pass
	zip -rP $BUILD_PASSWORD $pass.zip $BUILD_DIR;
	
		if [ $? -eq 0 ];then
			echo -e "\033[33m Compression and encryption complete! \033[0m";
		fi
fi

