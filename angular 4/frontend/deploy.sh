ng build --aot --prod
ssh -t root@198.211.124.170 "rm -Rf /var/www/html/*"
scp -r dist/. root@198.211.124.170:/var/www/html
echo Deployed!
