> docker-compose up -d
> docker-compose ps

> docker-compose down
    이렇게 하면 컨테이너와 네트워크만 삭제되고, 볼륨(데이터)은 남아있어서 다음에 컨테이너를 다시 올리면 데이터가 유지됩니다.

> docker-compose down -v
    명령어에서 -v 옵션은 모든 연결된 볼륨(volume)도 함께 삭제합니다. 이 때문에 컨테이너 내부에 저장된 데이터도 모두 사라집니다.

PostgreSQL의 표준 접속 URI는 다음과 같습니다:

postgresql://<user>:<password>@<host>:<port>/<database>
postgresql://myuser:mypassword@localhost:5432/mydatabase