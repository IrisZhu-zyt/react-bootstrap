import React, { useCallback, useEffect, useState } from 'react'
import { Input, Pagination } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useLoaderData } from 'react-router-dom'

import SelectItem from './components/SelectItem'
import ListItem from './components/ListItem'
import './scss/Repositories.scss'

import { getUserRepo } from '../../network'

const { Search } = Input
export async function loader({ params }) {
  // 进入路由请求第一页
  const result = await getUserRepo({ username: params.username, page: 1 })
  if (!result) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  const { data } = result
  const nextPage = result.nextPage !== undefined ? result.nextPage : -1
  const lastPage = result.lastPage !== undefined ? result.lastPage : -1
  // const data = [
  //   {
  //     id: 1296269,
  //     node_id: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
  //     name: 'Hello-World',
  //     full_name: 'octocat/Hello-World',
  //     owner: {
  //       login: 'octocat',
  //       id: 1,
  //       node_id: 'MDQ6VXNlcjE=',
  //       avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  //       gravatar_id: '',
  //       url: 'https://api.github.com/users/octocat',
  //       html_url: 'https://github.com/octocat',
  //       followers_url: 'https://api.github.com/users/octocat/followers',
  //       following_url: 'https://api.github.com/users/octocat/following{/other_user}',
  //       gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
  //       starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
  //       subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
  //       organizations_url: 'https://api.github.com/users/octocat/orgs',
  //       repos_url: 'https://api.github.com/users/octocat/repos',
  //       events_url: 'https://api.github.com/users/octocat/events{/privacy}',
  //       received_events_url: 'https://api.github.com/users/octocat/received_events',
  //       type: 'User',
  //       site_admin: false,
  //     },
  //     private: false,
  //     html_url: 'https://github.com/octocat/Hello-World',
  //     description: 'This your first repo!',
  //     fork: false,
  //     url: 'https://api.github.com/repos/octocat/Hello-World',
  //     archive_url: 'https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
  //     assignees_url: 'https://api.github.com/repos/octocat/Hello-World/assignees{/user}',
  //     blobs_url: 'https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
  //     branches_url: 'https://api.github.com/repos/octocat/Hello-World/branches{/branch}',
  //     collaborators_url: 'https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
  //     comments_url: 'https://api.github.com/repos/octocat/Hello-World/comments{/number}',
  //     commits_url: 'https://api.github.com/repos/octocat/Hello-World/commits{/sha}',
  //     compare_url: 'https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
  //     contents_url: 'https://api.github.com/repos/octocat/Hello-World/contents/{+path}',
  //     contributors_url: 'https://api.github.com/repos/octocat/Hello-World/contributors',
  //     deployments_url: 'https://api.github.com/repos/octocat/Hello-World/deployments',
  //     downloads_url: 'https://api.github.com/repos/octocat/Hello-World/downloads',
  //     events_url: 'https://api.github.com/repos/octocat/Hello-World/events',
  //     forks_url: 'https://api.github.com/repos/octocat/Hello-World/forks',
  //     git_commits_url: 'https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
  //     git_refs_url: 'https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
  //     git_tags_url: 'https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
  //     git_url: 'git:github.com/octocat/Hello-World.git',
  //     issue_comment_url: 'https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
  //     issue_events_url: 'https://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
  //     issues_url: 'https://api.github.com/repos/octocat/Hello-World/issues{/number}',
  //     keys_url: 'https://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
  //     labels_url: 'https://api.github.com/repos/octocat/Hello-World/labels{/name}',
  //     languages_url: 'https://api.github.com/repos/octocat/Hello-World/languages',
  //     merges_url: 'https://api.github.com/repos/octocat/Hello-World/merges',
  //     milestones_url: 'https://api.github.com/repos/octocat/Hello-World/milestones{/number}',
  //     notifications_url: 'https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}',
  //     pulls_url: 'https://api.github.com/repos/octocat/Hello-World/pulls{/number}',
  //     releases_url: 'https://api.github.com/repos/octocat/Hello-World/releases{/id}',
  //     ssh_url: 'git@github.com:octocat/Hello-World.git',
  //     stargazers_url: 'https://api.github.com/repos/octocat/Hello-World/stargazers',
  //     statuses_url: 'https://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
  //     subscribers_url: 'https://api.github.com/repos/octocat/Hello-World/subscribers',
  //     subscription_url: 'https://api.github.com/repos/octocat/Hello-World/subscription',
  //     tags_url: 'https://api.github.com/repos/octocat/Hello-World/tags',
  //     teams_url: 'https://api.github.com/repos/octocat/Hello-World/teams',
  //     trees_url: 'https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
  //     clone_url: 'https://github.com/octocat/Hello-World.git',
  //     mirror_url: 'git:git.example.com/octocat/Hello-World',
  //     hooks_url: 'https://api.github.com/repos/octocat/Hello-World/hooks',
  //     svn_url: 'https://svn.github.com/octocat/Hello-World',
  //     homepage: 'https://github.com',
  //     language: 'Typescript',
  //     forks_count: 9,
  //     stargazers_count: 80,
  //     watchers_count: 80,
  //     size: 108,
  //     default_branch: 'master',
  //     open_issues_count: 0,
  //     is_template: false,
  //     topics: [
  //       'octocat',
  //       'atom',
  //       'electron',
  //       'api',
  //     ],
  //     has_issues: true,
  //     has_projects: true,
  //     has_wiki: true,
  //     has_pages: false,
  //     has_downloads: true,
  //     has_discussions: false,
  //     archived: false,
  //     disabled: false,
  //     visibility: 'Public',
  //     pushed_at: '2011-01-26T19:06:43Z',
  //     created_at: '2011-01-26T19:01:12Z',
  //     updated_at: '2011-01-26T19:14:43Z',
  //     permissions: {
  //       admin: false,
  //       push: false,
  //       pull: true,
  //     },
  //     security_and_analysis: {
  //       advanced_security: {
  //         status: 'enabled',
  //       },
  //       secret_scanning: {
  //         status: 'enabled',
  //       },
  //       secret_scanning_push_protection: {
  //         status: 'disabled',
  //       },
  //     },
  //   },
  //   {
  //     id: 1296270,
  //     node_id: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
  //     name: 'Hello-World',
  //     full_name: 'octocat/Hello-World',
  //     owner: {
  //       login: 'octocat',
  //       id: 1,
  //       node_id: 'MDQ6VXNlcjE=',
  //       avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  //       gravatar_id: '',
  //       url: 'https://api.github.com/users/octocat',
  //       html_url: 'https://github.com/octocat',
  //       followers_url: 'https://api.github.com/users/octocat/followers',
  //       following_url: 'https://api.github.com/users/octocat/following{/other_user}',
  //       gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
  //       starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
  //       subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
  //       organizations_url: 'https://api.github.com/users/octocat/orgs',
  //       repos_url: 'https://api.github.com/users/octocat/repos',
  //       events_url: 'https://api.github.com/users/octocat/events{/privacy}',
  //       received_events_url: 'https://api.github.com/users/octocat/received_events',
  //       type: 'User',
  //       site_admin: false,
  //     },
  //     private: false,
  //     html_url: 'https://github.com/octocat/Hello-World',
  //     description: 'This your first repo!',
  //     fork: false,
  //     url: 'https://api.github.com/repos/octocat/Hello-World',
  //     archive_url: 'https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
  //     assignees_url: 'https://api.github.com/repos/octocat/Hello-World/assignees{/user}',
  //     blobs_url: 'https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
  //     branches_url: 'https://api.github.com/repos/octocat/Hello-World/branches{/branch}',
  //     collaborators_url: 'https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
  //     comments_url: 'https://api.github.com/repos/octocat/Hello-World/comments{/number}',
  //     commits_url: 'https://api.github.com/repos/octocat/Hello-World/commits{/sha}',
  //     compare_url: 'https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
  //     contents_url: 'https://api.github.com/repos/octocat/Hello-World/contents/{+path}',
  //     contributors_url: 'https://api.github.com/repos/octocat/Hello-World/contributors',
  //     deployments_url: 'https://api.github.com/repos/octocat/Hello-World/deployments',
  //     downloads_url: 'https://api.github.com/repos/octocat/Hello-World/downloads',
  //     events_url: 'https://api.github.com/repos/octocat/Hello-World/events',
  //     forks_url: 'https://api.github.com/repos/octocat/Hello-World/forks',
  //     git_commits_url: 'https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
  //     git_refs_url: 'https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
  //     git_tags_url: 'https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
  //     git_url: 'git:github.com/octocat/Hello-World.git',
  //     issue_comment_url: 'https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
  //     issue_events_url: 'https://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
  //     issues_url: 'https://api.github.com/repos/octocat/Hello-World/issues{/number}',
  //     keys_url: 'https://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
  //     labels_url: 'https://api.github.com/repos/octocat/Hello-World/labels{/name}',
  //     languages_url: 'https://api.github.com/repos/octocat/Hello-World/languages',
  //     merges_url: 'https://api.github.com/repos/octocat/Hello-World/merges',
  //     milestones_url: 'https://api.github.com/repos/octocat/Hello-World/milestones{/number}',
  //     notifications_url: 'https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}',
  //     pulls_url: 'https://api.github.com/repos/octocat/Hello-World/pulls{/number}',
  //     releases_url: 'https://api.github.com/repos/octocat/Hello-World/releases{/id}',
  //     ssh_url: 'git@github.com:octocat/Hello-World.git',
  //     stargazers_url: 'https://api.github.com/repos/octocat/Hello-World/stargazers',
  //     statuses_url: 'https://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
  //     subscribers_url: 'https://api.github.com/repos/octocat/Hello-World/subscribers',
  //     subscription_url: 'https://api.github.com/repos/octocat/Hello-World/subscription',
  //     tags_url: 'https://api.github.com/repos/octocat/Hello-World/tags',
  //     teams_url: 'https://api.github.com/repos/octocat/Hello-World/teams',
  //     trees_url: 'https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
  //     clone_url: 'https://github.com/octocat/Hello-World.git',
  //     mirror_url: 'git:git.example.com/octocat/Hello-World',
  //     hooks_url: 'https://api.github.com/repos/octocat/Hello-World/hooks',
  //     svn_url: 'https://svn.github.com/octocat/Hello-World',
  //     homepage: 'https://github.com',
  //     language: null,
  //     forks_count: 9,
  //     stargazers_count: 80,
  //     watchers_count: 80,
  //     size: 108,
  //     default_branch: 'master',
  //     open_issues_count: 0,
  //     is_template: false,
  //     topics: [
  //       'octocat',
  //       'atom',
  //       'electron',
  //       'api',
  //     ],
  //     has_issues: true,
  //     has_projects: true,
  //     has_wiki: true,
  //     has_pages: false,
  //     has_downloads: true,
  //     has_discussions: false,
  //     archived: false,
  //     disabled: false,
  //     visibility: 'public',
  //     pushed_at: '2011-01-26T19:06:43Z',
  //     created_at: '2011-01-26T19:01:12Z',
  //     updated_at: '2011-01-26T19:14:43Z',
  //     permissions: {
  //       admin: false,
  //       push: false,
  //       pull: true,
  //     },
  //     security_and_analysis: {
  //       advanced_security: {
  //         status: 'enabled',
  //       },
  //       secret_scanning: {
  //         status: 'enabled',
  //       },
  //       secret_scanning_push_protection: {
  //         status: 'disabled',
  //       },
  //     },
  //   },
  // ]
  return {
    data, lastPage, nextPage, params,
  }
}
export default function Repositories() {
  const onSearch = (value) => console.log(value)
  const { data, lastPage, params } = useLoaderData()
  const [searchParams] = useState(params)
  // 总数为总页数乘以每页数量
  const [total] = useState(lastPage * 5)
  const [dataList, setDataList] = useState(data)

  const selectArr = [
    {
      label: 'Type',
      options: [
        {
          label: 'All',
          value: 'All',
        },
        // 'Public',
        // 'Source',
        // 'Forks',
        // 'Archived',
        // 'Mirrors',
        // 'Templates',
      ],
    },
    {
      label: 'Language',
      options: [
        {
          label: 'All',
          value: 'All',
        },
      ],
    },
    {
      label: 'Sort',
      options: [
        {
          label: 'Last updated',
          value: 'Last updated',
        },
        // 'Last updated',
        // 'Name',
        // 'Stars',
      ],
    },
  ]
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a>
          <LeftOutlined />
          <span>Previous</span>
        </a>
      )
    }
    if (type === 'next') {
      return (
        <a>
          <span>Next</span>
          <RightOutlined />
        </a>
      )
    }
    return originalElement
  }
  const getSearchData = async (params) => {
    const result = await getUserRepo(params)
    if (!result) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      })
    }
    const { data } = result
    setDataList(data)
  }
  const changePage = useCallback((page) => {
    const params = {
      ...searchParams,
      page,
    }
    getSearchData(params)
  })

  useEffect(() => {})
  return (
    <div className="repositories-container">
      <div className="search-bar">
        <div className="search-input-wrap">
          <Search
            className="search-input"
            placeholder="Find a repository"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <div className="selet-items-wrap">
          {
            selectArr.map((item) => (
              <SelectItem
                label={item.label}
                options={item.options}
                key={item.label}
              />
            ))
          }
        </div>
      </div>
      <div className="repo-list-wrap">
        <ul className="repo-list">
          {
            dataList.map((item) => (
              <ListItem
                item={item}
                key={item.id}
                username={params.username}
              />
            ))
          }
        </ul>
      </div>
      <div className="paginate-container">
        <Pagination
          defaultCurrent={1}
          total={total}
          onChange={changePage}
          showSizeChanger={false}
          defaultPageSize={5}
          itemRender={itemRender}
        />
      </div>
    </div>
  )
}
