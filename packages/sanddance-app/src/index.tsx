// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { use } from "./base";
import { fluentUI } from "./fluentUIComponents";
import { SandDanceApp } from "./sanddanceApp";
import { DataSource, InsightMap } from "./types";
import * as SandDanceExplorer from "@msrvida/sanddance-explorer";
import {
  ColorSettings,
  DataFileType,
  Explorer_Class,
  Prefs,
} from "@msrvida/sanddance-explorer";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as vega from "vega";
import { AuthProvider } from "universal-keycloak-auth/react";

use(fluentUI, vega);

/* Keycloak Config */
const keycloakConfig = {
  url: "https://auth.kc.onebit.ng",
  realm: "AURORA",
  clientId: "9779d9dd-5fa7-46ae-97f2-7fbd258a68db",
};

const staticContent = Array.from(
  document.querySelectorAll<HTMLAnchorElement>(
    "a.sanddance-app-static-content",
  ),
);

const dataSets = staticContent
  .filter((f) => f.id)
  .map<DataSource>((n) => {
    const forData = staticContent.filter((f) => f.dataset["for"] === n.id)[0];
    return {
      dataSourceType: "sample",
      id: n.id,
      displayName: n.dataset["displayName"],
      dataUrl: n.href,
      type: n.dataset["type"] as DataFileType,
      snapshotsUrl: forData ? forData.href : null,
    };
  });

let explorer: Explorer_Class;

declare let insights: InsightMap;
declare let darkTheme: boolean;
declare function setTheme(darkTheme: boolean): void;
declare let options: { [datasetId: string]: Prefs };
declare let themeColors: { [theme: string]: ColorSettings };

const undef = typeof undefined;

ReactDOM.render(
  <AuthProvider
    config={keycloakConfig}
    onEvent={(event, error) => {
      // console.log("Auth Event:", event, error)
    }}
    onTokens={(tokens) => {}}
    onLoad="check-sso"
  >
    <SandDanceApp
      setTheme={typeof setTheme !== undef && setTheme}
      darkTheme={typeof darkTheme !== undef && darkTheme}
      insights={typeof insights !== undef && insights}
      initialOptions={typeof options !== undef && options}
      themeColors={typeof themeColors !== undef && themeColors}
      dataSources={dataSets}
      mounted={(app) => {
        explorer = app.explorer;
      }}
    />
  </AuthProvider>,
  document.getElementById("app"),
);

const z = "z".charCodeAt(0);
const Z = "Z".charCodeAt(0);

document.onkeyup = (e) => {
  //look for CTRL Z or CTRL SHIFT Z
  if (e.ctrlKey && (e.keyCode === z || e.keyCode === Z)) {
    if (e.shiftKey) {
      explorer.redo();
    } else {
      explorer.undo();
    }
  }
};

window["SandDanceApp"] = { explorer, SandDanceExplorer };
