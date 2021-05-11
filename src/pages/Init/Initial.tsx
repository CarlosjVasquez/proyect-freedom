import React, { useState, useEffect } from "react"

import { IonCol } from "@ionic/react"

import { useQuery } from "@apollo/client"

import { AppVersion } from "@ionic-native/app-version"
import { HTTP } from "@ionic-native/http"
import { File } from "@ionic-native/file"
import { AndroidPermissions } from "@ionic-native/android-permissions"
import { FileOpener } from "@ionic-native/file-opener"

import AuthLayout from "../../Layouts/AuthLayout/AuthLayout"
import HeaderLogo from "../../components/HeaderLogo/HeaderLogo"
import BtnPrimary from "../../components/BtnPrimary/BtnPrimary"
import Footer from "../../components/Auth/Footer/Footer"
import { FirstRowStyled } from "../../components/ContainerForm/ContainerForm"
import Toast from "../../components/Toast/Toast"

import { Query } from "../../server/querys"
import Loading from "../../components/Loading/Loading"

const { version } = Query.query

const Init: React.FC = (props: any) => {
  const [appName, setAppName] = useState("")
  const [appVersion, setAppVersion] = useState("")
  const [error, setError] = useState(false)
  const [urlApp, setUrlApp] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const {} = useQuery(version, {
    onCompleted: ({ consultaVersion }) => {
      if (consultaVersion.version) {
        setAppName(consultaVersion.title)
        setUrlApp(
          `https://hyhlibertad2.herokuapp.com/media/${consultaVersion.apk}`
        )
        AppVersion.getVersionNumber()
          .then((version: any) => {
            setAppVersion(version)
            if (version !== consultaVersion.version) {
              setError(true)
              setLoading(false)
            } else {
              setLoading(false)
            }
          })
          .catch((err) => {
            console.log(err)
            setError(true)
            setLoading(false)
          })
      }
    },
  })

  const DownloadApp = () => {
    HTTP.downloadFile(
      urlApp,
      {},
      {},
      File.externalRootDirectory + "Download/" + appName
    )
      .then((entry: any) => {
        const url = entry.toURL()
        FileOpener.open(url, "application/vnd.android.package-archive")
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false)
            setError(true)
          })
      })
      .catch((err: any) => {
        console.log(err)
        setError(true)
        setLoading(false)
      })
  }

  const download = () => {
    setLoading(true)
    AndroidPermissions.checkPermission(
      AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    )
      .then((res: any) => {
        if (!res.hasPermission) {
          AndroidPermissions.requestPermissions([
            AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            AndroidPermissions.PERMISSION.ACTION_INSTALL_PACKAGE,
          ]).then((res) => {
            DownloadApp()
          })
        } else {
          AndroidPermissions.checkPermission(
            AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
          ).then((res) => {
            if (!res.hasPermission) {
              AndroidPermissions.requestPermissions([
                AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
                AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                AndroidPermissions.PERMISSION.ACTION_INSTALL_PACKAGE,
              ]).then((res) => {
                DownloadApp()
              })
            } else {
              AndroidPermissions.checkPermission(
                AndroidPermissions.PERMISSION.ACTION_INSTALL_PACKAGE
              ).then((res) => {
                if (!res.hasPermission) {
                  AndroidPermissions.requestPermissions([
                    AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
                    AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                    AndroidPermissions.PERMISSION.ACTION_INSTALL_PACKAGE,
                  ]).then((res) => {
                    DownloadApp()
                  })
                } else {
                  DownloadApp()
                }
              })
            }
          })
        }
      })
      .catch((err: any) => {
        console.log(err)
        AndroidPermissions.requestPermissions([
          AndroidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
          AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          AndroidPermissions.PERMISSION.ACTION_INSTALL_PACKAGE,
        ]).then((res) => {
          DownloadApp()
        })
      })
  }

  const registerHandle = () => {
    props.history.push("/register")
  }
  const loginHandle = () => {
    props.history.push("/login")
  }

  return (
    <>
      <AuthLayout footer={<Footer title={`XIRUX ${appVersion}`} />}>
        <Loading active={loading} />
        <HeaderLogo />
        {!loading && (
          <FirstRowStyled>
            {!error ? (
              <IonCol>
                <BtnPrimary name="Login" onClickHandle={loginHandle} />
                <BtnPrimary
                  color="second"
                  name="Register"
                  onClickHandle={registerHandle}
                />
              </IonCol>
            ) : (
              <BtnPrimary name="Descargar" onClickHandle={download} />
            )}
          </FirstRowStyled>
        )}

        <Toast
          active={false}
          message="Outdated version of the application please download and install the latest version"
        />
      </AuthLayout>
    </>
  )
}

export default Init
