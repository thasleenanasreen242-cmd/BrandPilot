"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";

type Recommendation={priority?:"high"|"medium"|"low";category?:string;title?:string;description?:string};
type AuditResponse={success?:boolean;error?:string;website?:{url:string;hostname:string;status:number};scores?:{overall:number;seo:number;performance:number;content:number;brand:number;technical:number};audit?:{url:string;hostname:string;status:number;