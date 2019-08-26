
Spin up a typical Amazon Linux 2 AMI (HVM) AWS instance and run:

```bash
sudo snap install docker
sudo groupadd docker
sudo usermod -aG docker $USER
./build.sh
```

the run this in as many threads as it takes to nearly saturate your cpu:
```
./run.sh
```
