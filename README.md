
Spin up a typical Amazon Linux 2 AMI (HVM) AWS instance and run:

```bash
sudo yum update -y
sudo yum install git -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
```
at this point you want to log out and then log back in.

then pull down this repo and build the container:
```
git clone https://github.com/austintgriffith/clover-miner-docker
cd clover-miner-docker
./build.sh
```

then run this in as many threads as it takes to nearly saturate your cpu:
```
./run.sh
```
