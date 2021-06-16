
import { Router, Routes } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID, Injector } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { makeStateKey, TransferState } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  customDomain=null
  domain=null
  theme=6
  isBrowser
  id=null
  webiteData=null
  constructor(
    public router:Router,
    public stateTransfer:TransferState,
    @Inject(PLATFORM_ID) platformId, 
    private injector: Injector,
    public db:AngularFirestore) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  loadConfig(){
    this.setDomain()
    if(this.isBrowser){
      const key = makeStateKey<any>('websiteData');
      if(this.stateTransfer.hasKey(key)){
        console.log("key present",this.stateTransfer.get(key,null))
        this.id=this.stateTransfer.get(key,null).id
        this.webiteData=this.stateTransfer.get(key,null)
        return true
      }else{
        return this.sedDomainAndGetData()
      }
      
    }else{
      return true
    }
   

  }

  sedDomainAndGetData(){
    this.setDomain()
    return this.getData()
  }

  setDomain() {
    if(environment['appPackageName']){
      this.customDomain = environment['appPackageName']
    }else{
      if (!this.isBrowser) {
        let host
        if(this.injector.get('header')['req']['headers']['x-forwarded-host']){
          host=this.injector.get('header')['req']['headers']['x-forwarded-host']
        }else{
          host=this.injector.get('header')['req']['headers']['host']
        }
        console.log(this.injector.get('header')['req']['url'])
        console.log(environment.hostdomain.indexOf(host))
        //console.log(this.injector.get('header'))
        if (environment.hostdomain.indexOf(host)!=-1) {
          console.log("it is platform")
          if(this.injector.get('header')['req']['url']){
            //console.log(this.injector.get('header')['req']['url'].split("/"))
            this.domain=this.injector.get('header')['req']['url'].split("/")[1]
            console.log("domain:",this.domain)
          }
        }
        else {
          this.customDomain = host
        }
      }
      else {
        // console.log(window.location.hostname)
        if (environment.hostdomain.indexOf(window.location.hostname) != -1) {
          console.log("testing")
          this.domain=window.location.href.split("/")[3]
        }
        else {
          console.log("custom domain")
          this.customDomain = window.location.hostname
        }
      }
    }
    
    


  }

  getData(){
    return new Promise((resolve,reject)=>{
      if(this.customDomain){
        console.log("custom:",this.customDomain)
        this.db.collection("users",ref=>ref.where("customDomains", "array-contains", this.customDomain)).get().toPromise().then(res=>{
          console.log(">>>>>",res)
          if(res.docs.length>0 && res.docs[0].id){
            console.log(res.docs[0].id)
            this.id=res.docs[0].id
            this.webiteData={id:this.id,...res.docs[0].data()}
            console.log("website data",this.webiteData)
            resolve(this.webiteData)
          }else{
            reject({error:"error occoured"})
          }
        })
      }else{
        console.log("domain",this.domain)
        if(this.domain){
          this.db.collection("users",ref=>ref.where("domainName", "==",this.domain)).get().toPromise().then(res=>{
            if(res.docs.length>0 && res.docs[0].id){
              console.log(res.docs[0].id)
              this.id=res.docs[0].id
              this.webiteData={id:this.id,...res.docs[0].data()}
              resolve(this.webiteData)
            }else{
              reject({error:"error occoured"})
            }

          })
        }else{
          return new Promise((resolve,reject)=>{
            resolve({})
          })
        }
      }
    })

    
  }


  isCustomDomain(){
    this.setDomain()
    if(this.customDomain){
      return true
    }else{
      return false
    }
  }



  getConfig(){
    return {customDomain:this.customDomain}
  }


  getWebsiteId(){
    return this.id
  }

  getWebsiteData(){
    return this.webiteData
  }

  getRoutes(theme=1) {
    if(this.isBrowser){
      let routes: Routes = [];
      console.log(theme)
      let path =''
      if(!this.isCustomDomain()){
        path=":domain"
      }
      if (theme==1) {
        routes = [
          
          {
            path: path, loadChildren: () => import('../website/theme1/theme1.module').then(mod => mod.Theme1Module)
          },
          {path:"", loadChildren: () => import('../website/website.module').then(m => m.WebsiteModule)},
        ];
      } 
      else if(theme==6) {
        routes = [
          {
            path: path, loadChildren: () => import('../website/theme6/theme6.module').then(mod => mod.Theme6Module)
          },
          {path:"", loadChildren: () => import('../website/website.module').then(m => m.WebsiteModule)},

        ];
      }
      return routes;
    }else{
      return []
    }
  }

    getDomain(){
      return this.domain
    }

    getCustomDomain(){
      return this.customDomain
    }
}
