
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

then run this to start mining clovers:
```
./run.sh
```

you can also run multiple threads with:
```
./threads.sh 8
```

once clovers start to get mined you can view them on port `8000` if you run:
```
./server.sh
```
