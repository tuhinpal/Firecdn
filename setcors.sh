echo "Enter the cloud-storage-bucket URL (Starts with gs://): "  
read cloud_storage_bucket 
echo '[{"origin":["*"],"method":["GET"],"maxAgeSeconds":3600}]' > cors.json
gsutil cors set cors.json $cloud_storage_bucket
rm cors.json
echo "CORS Setted, Now go back to https://github.com/cachecleanerjeet/firecdn"