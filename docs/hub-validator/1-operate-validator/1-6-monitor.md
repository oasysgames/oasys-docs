# Monitor Metrics
You can monitor the validator's performance by using [InfluxDB](https://www.influxdata.com/) and [Grafana](https://grafana.com/).
This procedure refers to [Geth docs](https://geth.ethereum.org/docs/monitoring/dashboards) and [Ethereum docs](https://ethereum.org/en/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

## InfluxDB Setting

### Install
Please install InfluxDB and InfluxDB-CLI on [the install page](https://docs.influxdata.com/influxdb/v2.6/install/).

### Build InfluxDB
Please start InfluxDB by using the following command

```shell
influxd
```

And you can access InfluxDB through `localhost:8086`.

### Create User and Database(GUI)
To store data from geth, you must create a user and database(InfluxDB calls bucket) at InfluxDB.

If you can access localhost:8086 from a browser, you can create a user and database.

For details, refer to [InfluxDB setup](https://docs.influxdata.com/influxdb/v2.6/install/#set-up-influxdb-through-the-ui).

Please sign in at `http//localhost:8086` with the following setting.

|                 |                                            |
|-----------------|--------------------------------------------|
| Username         | geth                                      |
| Password | `The password you want to set`                                        |
| Bucket(Database)             | geth         |
| Organization        | oasys    |

![InfluxDB GUI SignIn](/img/docs/techdocs/monitor-validator/influxdb_signin.png)

### Create User and Database(CLI)
To store data from geth, you must create a user and database(InfluxDB calls bucket) at InfluxDB.

If you cannot access localhost:8086 from a browser, you can create a user and database by InfluxDB-CLI.

For details, refer to [InfluxDB setup](https://docs.influxdata.com/influxdb/v2.6/install/?t=Set+up+with+the+CLI#set-up-influxdb-through-the-influx-cli).

```shell
influx setup \
  --username geth \
  --password <PASSWORD_YOU_WANT_TO_SET> \
  --bucket geth \
  --org oasys
```

### Check Your Access Token
InfluxDB data is stored in `~/.influxdbv2`. 

And you can check your access token by the following command.

```shell
cat ~/.influxdbv2/configs 
```

```shell
[default]
  url = "http://localhost:8086"
  token = "GAKFGBrM4..." # Access Token
  org = "oasys"
  active = true
```

Save your access token to use by Grafana.

## Geth Setting
Please execute the following command to allow geth to store metrics in InfluxDB.

```shell
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password <YOUR_PASSWORD>
```

You can verify that Geth is successfully pushing data by the following commands.
```shell
# To enter DB shell
influx user list -n geth -t <YOUR_ACCESS_TOKEN>
```

```shell
# In DB shell
use geth
show measurements
```

## Grafana Setting

### Install
Please install Grafana on [the install page](https://grafana.com/docs/grafana/latest/setup-grafana/installation/).

### Build Grafana
You will find the startup commands on the install page of each environment, so please use them to start Grafana.
### Allow accessing InfluxDB(InfluxQL)
You can access Grafana through `localhost:3000`.

You can access a visualization dashboard. The browser will prompt for login credentials (user: `admin` and password: `admin`). When prompted, the default password should be changed and saved.

To set InfluxDB as the data source, click on the `Data sources` icon and click on `InfluxDB`.

Please set The following configuration.
```yaml
Name: InfluxDB
Query Language: InfluxQL
HTTP:
  URL: http://localhost:8086
  Access: Server (default)
  Whitelisted cookies: None (leave blank)
Auth:
  All options left as their default (switches off)
Custom HTTP Headers:
  - Heder: Authorization
    Value: Token <YOUR_ACCESS_TOKEN> # There is a space between 'Token' and <YOUR_ACCESS_TOKEN>
InfluxDB Details:
  Database: geth
  User: geth
  Password: <your-password>
  HTTP Method: GET
```

![Grafana influxQL1](/img/docs/techdocs/monitor-validator/grafana_influxQL_1.png)
![Grafana influxQL2](/img/docs/techdocs/monitor-validator/grafana_influxQL_2.png)

Click on `Save and test` and wait for the confirmation to pop up.

For details, refer to [InfluxDB docs](https://docs.influxdata.com/influxdb/v2.0/tools/grafana/?t=InfluxQL).

### Allow accessing InfluxDB(Flux)
You can access Grafana through `localhost:3000`.

You can access a visualization dashboard. The browser will prompt for login credentials (user: `admin` and password: `admin`). When prompted, the default password should be changed and saved.

To set InfluxDB as the data source, click on the `Data sources` icon and click on `InfluxDB`.

Please set The following configuration.
```yaml
Name: InfluxDB
Query Language: Flux
HTTP:
  URL: http://localhost:8086
  Access: Server (default)
  Whitelisted cookies: None (leave blank)
Auth:
  All options left as their default (switches off)
Custom HTTP Headers:
  None
InfluxDB Details
  Organization: oasys
  Token: <your-access-token>
  Default Bucket: geth
```

![Grafana Flux 1](/img/docs/techdocs/monitor-validator/grafana_flux_1.png)
![Grafana Flux 2](/img/docs/techdocs/monitor-validator/grafana_flux_2.png)

Click on `Save and test` and wait for the confirmation to pop up.

For details, refer to [InfluxDB docs](https://docs.influxdata.com/influxdb/v2.0/tools/grafana/).

### Customize Dashboard
If you want to customize the dashboard, please refer to [Ethereum docs](https://ethereum.org/en/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/#setting-up-grafana).
