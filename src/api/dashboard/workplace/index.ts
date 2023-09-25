import { defHttp } from '@/config/axios'
import type { WorkplaceTotal, Project, Dynamic, Team, RadarData } from './types'

export const getCountApi = (): Promise<IResponse<WorkplaceTotal>> => {
  return defHttp.get({ url: '/workplace/total' })
}

export const getProjectApi = (): Promise<IResponse<Project>> => {
  return defHttp.get({ url: '/workplace/project' })
}

export const getDynamicApi = (): Promise<IResponse<Dynamic[]>> => {
  return defHttp.get({ url: '/workplace/dynamic' })
}

export const getTeamApi = (): Promise<IResponse<Team[]>> => {
  return defHttp.get({ url: '/workplace/team' })
}

export const getRadarApi = (): Promise<IResponse<RadarData[]>> => {
  return defHttp.get({ url: '/workplace/radar' })
}
