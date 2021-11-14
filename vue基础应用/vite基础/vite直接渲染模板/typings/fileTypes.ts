import type {Component } from 'vue'

export interface FileType {
    [key: string]: Component
}

export interface IChild {
    icon?: string
    title: string
    href?: string
    children?: IChild[]
}