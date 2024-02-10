import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  blogContentTypeCollection?: Maybe<BlogContentTypeCollection>;
  entryCollection?: Maybe<EntryCollection>;
  eventContentTypeCollection?: Maybe<EventContentTypeCollection>;
  eventImageSliderCollection?: Maybe<EventImageSliderCollection>;
  membersOfTheManagingCommitteeKapCollection?: Maybe<MembersOfTheManagingCommitteeKapCollection>;
  membersOfYoungAmilPanchayatCommunityCollection?: Maybe<MembersOfYoungAmilPanchayatCommunityCollection>;
  officeBearersCollection?: Maybe<OfficeBearersCollection>;
  pastEventContentTypeCollection?: Maybe<PastEventContentTypeCollection>;
};


export type AssetLinkingCollectionsBlogContentTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsEventContentTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsEventImageSliderCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsMembersOfTheManagingCommitteeKapCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsMembersOfYoungAmilPanchayatCommunityCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsOfficeBearersCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsPastEventContentTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentType = Entry & {
  __typename?: 'BlogContentType';
  author?: Maybe<Scalars['String']['output']>;
  blogContent?: Maybe<BlogContentTypeBlogContent>;
  blogDisplayPicture?: Maybe<Asset>;
  blogSlug?: Maybe<Scalars['String']['output']>;
  blogTags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  blogTitle?: Maybe<Scalars['String']['output']>;
  blogType?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  contentfulMetadata: ContentfulMetadata;
  dateOfBlog?: Maybe<Scalars['DateTime']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<BlogContentTypeLinkingCollections>;
  sys: Sys;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeAuthorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeBlogContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeBlogDisplayPictureArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeBlogSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeBlogTagsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeBlogTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeBlogTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeDateOfBlogArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeExcerptArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** This content type represents the content that will go on your blog page, select the type weather if it's samachar, publication or a regular blog [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/blogContentType) */
export type BlogContentTypeLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BlogContentTypeBlogContent = {
  __typename?: 'BlogContentTypeBlogContent';
  json: Scalars['JSON']['output'];
  links: BlogContentTypeBlogContentLinks;
};

export type BlogContentTypeBlogContentAssets = {
  __typename?: 'BlogContentTypeBlogContentAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type BlogContentTypeBlogContentEntries = {
  __typename?: 'BlogContentTypeBlogContentEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type BlogContentTypeBlogContentLinks = {
  __typename?: 'BlogContentTypeBlogContentLinks';
  assets: BlogContentTypeBlogContentAssets;
  entries: BlogContentTypeBlogContentEntries;
  resources: BlogContentTypeBlogContentResources;
};

export type BlogContentTypeBlogContentResources = {
  __typename?: 'BlogContentTypeBlogContentResources';
  block: Array<ResourceLink>;
  hyperlink: Array<ResourceLink>;
  inline: Array<ResourceLink>;
};

export type BlogContentTypeCollection = {
  __typename?: 'BlogContentTypeCollection';
  items: Array<Maybe<BlogContentType>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BlogContentTypeFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlogContentTypeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlogContentTypeFilter>>>;
  author?: InputMaybe<Scalars['String']['input']>;
  author_contains?: InputMaybe<Scalars['String']['input']>;
  author_exists?: InputMaybe<Scalars['Boolean']['input']>;
  author_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  author_not?: InputMaybe<Scalars['String']['input']>;
  author_not_contains?: InputMaybe<Scalars['String']['input']>;
  author_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogContent_contains?: InputMaybe<Scalars['String']['input']>;
  blogContent_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blogContent_not_contains?: InputMaybe<Scalars['String']['input']>;
  blogDisplayPicture_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blogSlug?: InputMaybe<Scalars['String']['input']>;
  blogSlug_contains?: InputMaybe<Scalars['String']['input']>;
  blogSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blogSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogSlug_not?: InputMaybe<Scalars['String']['input']>;
  blogSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  blogSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogTags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogTags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogTags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogTags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blogTitle?: InputMaybe<Scalars['String']['input']>;
  blogTitle_contains?: InputMaybe<Scalars['String']['input']>;
  blogTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blogTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogTitle_not?: InputMaybe<Scalars['String']['input']>;
  blogTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  blogTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogType_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogType_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogType_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  blogType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  dateOfBlog?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBlog_exists?: InputMaybe<Scalars['Boolean']['input']>;
  dateOfBlog_gt?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBlog_gte?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBlog_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  dateOfBlog_lt?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBlog_lte?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBlog_not?: InputMaybe<Scalars['DateTime']['input']>;
  dateOfBlog_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  excerpt_contains?: InputMaybe<Scalars['String']['input']>;
  excerpt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  excerpt_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excerpt_not?: InputMaybe<Scalars['String']['input']>;
  excerpt_not_contains?: InputMaybe<Scalars['String']['input']>;
  excerpt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type BlogContentTypeLinkingCollections = {
  __typename?: 'BlogContentTypeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type BlogContentTypeLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum BlogContentTypeOrder {
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  BlogSlugAsc = 'blogSlug_ASC',
  BlogSlugDesc = 'blogSlug_DESC',
  BlogTitleAsc = 'blogTitle_ASC',
  BlogTitleDesc = 'blogTitle_DESC',
  DateOfBlogAsc = 'dateOfBlog_ASC',
  DateOfBlogDesc = 'dateOfBlog_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentType = Entry & {
  __typename?: 'EventContentType';
  contentfulMetadata: ContentfulMetadata;
  eventDates?: Maybe<Scalars['DateTime']['output']>;
  eventDescription?: Maybe<EventContentTypeEventDescription>;
  eventDisplayImage?: Maybe<Asset>;
  eventLocation?: Maybe<Scalars['String']['output']>;
  eventSearchTags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  eventSlug?: Maybe<Scalars['String']['output']>;
  eventTitle?: Maybe<Scalars['String']['output']>;
  eventType?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedFrom?: Maybe<EventContentTypeLinkingCollections>;
  sys: Sys;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventDatesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventDisplayImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventSearchTagsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeEventTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** A content type for you to add your events, and the respective event data such as : Event location, event name, event venue and so on [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventContentType) */
export type EventContentTypeLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EventContentTypeCollection = {
  __typename?: 'EventContentTypeCollection';
  items: Array<Maybe<EventContentType>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EventContentTypeEventDescription = {
  __typename?: 'EventContentTypeEventDescription';
  json: Scalars['JSON']['output'];
  links: EventContentTypeEventDescriptionLinks;
};

export type EventContentTypeEventDescriptionAssets = {
  __typename?: 'EventContentTypeEventDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type EventContentTypeEventDescriptionEntries = {
  __typename?: 'EventContentTypeEventDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type EventContentTypeEventDescriptionLinks = {
  __typename?: 'EventContentTypeEventDescriptionLinks';
  assets: EventContentTypeEventDescriptionAssets;
  entries: EventContentTypeEventDescriptionEntries;
  resources: EventContentTypeEventDescriptionResources;
};

export type EventContentTypeEventDescriptionResources = {
  __typename?: 'EventContentTypeEventDescriptionResources';
  block: Array<ResourceLink>;
  hyperlink: Array<ResourceLink>;
  inline: Array<ResourceLink>;
};

export type EventContentTypeFilter = {
  AND?: InputMaybe<Array<InputMaybe<EventContentTypeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EventContentTypeFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  eventDates?: InputMaybe<Scalars['DateTime']['input']>;
  eventDates_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventDates_gt?: InputMaybe<Scalars['DateTime']['input']>;
  eventDates_gte?: InputMaybe<Scalars['DateTime']['input']>;
  eventDates_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  eventDates_lt?: InputMaybe<Scalars['DateTime']['input']>;
  eventDates_lte?: InputMaybe<Scalars['DateTime']['input']>;
  eventDates_not?: InputMaybe<Scalars['DateTime']['input']>;
  eventDates_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  eventDescription_contains?: InputMaybe<Scalars['String']['input']>;
  eventDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventDisplayImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventLocation?: InputMaybe<Scalars['String']['input']>;
  eventLocation_contains?: InputMaybe<Scalars['String']['input']>;
  eventLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventLocation_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventLocation_not?: InputMaybe<Scalars['String']['input']>;
  eventLocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventLocation_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventSearchTags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventSearchTags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventSearchTags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventSearchTags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventSlug?: InputMaybe<Scalars['String']['input']>;
  eventSlug_contains?: InputMaybe<Scalars['String']['input']>;
  eventSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventSlug_not?: InputMaybe<Scalars['String']['input']>;
  eventSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventTitle?: InputMaybe<Scalars['String']['input']>;
  eventTitle_contains?: InputMaybe<Scalars['String']['input']>;
  eventTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  eventTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventTitle_not?: InputMaybe<Scalars['String']['input']>;
  eventTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventType_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventType_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventType_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type EventContentTypeLinkingCollections = {
  __typename?: 'EventContentTypeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type EventContentTypeLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum EventContentTypeOrder {
  EventDatesAsc = 'eventDates_ASC',
  EventDatesDesc = 'eventDates_DESC',
  EventLocationAsc = 'eventLocation_ASC',
  EventLocationDesc = 'eventLocation_DESC',
  EventSlugAsc = 'eventSlug_ASC',
  EventSlugDesc = 'eventSlug_DESC',
  EventTitleAsc = 'eventTitle_ASC',
  EventTitleDesc = 'eventTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** bunch of images you can add for changing of backdrop images [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventImageSlider) */
export type EventImageSlider = Entry & {
  __typename?: 'EventImageSlider';
  contentfulMetadata: ContentfulMetadata;
  imagesCollection?: Maybe<AssetCollection>;
  linkedFrom?: Maybe<EventImageSliderLinkingCollections>;
  sys: Sys;
};


/** bunch of images you can add for changing of backdrop images [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventImageSlider) */
export type EventImageSliderImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** bunch of images you can add for changing of backdrop images [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/eventImageSlider) */
export type EventImageSliderLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type EventImageSliderCollection = {
  __typename?: 'EventImageSliderCollection';
  items: Array<Maybe<EventImageSlider>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EventImageSliderFilter = {
  AND?: InputMaybe<Array<InputMaybe<EventImageSliderFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EventImageSliderFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type EventImageSliderLinkingCollections = {
  __typename?: 'EventImageSliderLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type EventImageSliderLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum EventImageSliderOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** words by InduShani [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/induShaniWords) */
export type InduShaniWords = Entry & {
  __typename?: 'InduShaniWords';
  contentfulMetadata: ContentfulMetadata;
  herWords?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<InduShaniWordsLinkingCollections>;
  sys: Sys;
};


/** words by InduShani [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/induShaniWords) */
export type InduShaniWordsHerWordsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** words by InduShani [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/induShaniWords) */
export type InduShaniWordsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type InduShaniWordsCollection = {
  __typename?: 'InduShaniWordsCollection';
  items: Array<Maybe<InduShaniWords>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type InduShaniWordsFilter = {
  AND?: InputMaybe<Array<InputMaybe<InduShaniWordsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<InduShaniWordsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  herWords?: InputMaybe<Scalars['String']['input']>;
  herWords_contains?: InputMaybe<Scalars['String']['input']>;
  herWords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  herWords_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  herWords_not?: InputMaybe<Scalars['String']['input']>;
  herWords_not_contains?: InputMaybe<Scalars['String']['input']>;
  herWords_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type InduShaniWordsLinkingCollections = {
  __typename?: 'InduShaniWordsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type InduShaniWordsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum InduShaniWordsOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Managing community member details [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfTheManagingCommitteeKap) */
export type MembersOfTheManagingCommitteeKap = Entry & {
  __typename?: 'MembersOfTheManagingCommitteeKap';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<MembersOfTheManagingCommitteeKapLinkingCollections>;
  mkapDisplayPicture?: Maybe<Asset>;
  mkapName?: Maybe<Scalars['String']['output']>;
  mkapPosition?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** Managing community member details [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfTheManagingCommitteeKap) */
export type MembersOfTheManagingCommitteeKapLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Managing community member details [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfTheManagingCommitteeKap) */
export type MembersOfTheManagingCommitteeKapMkapDisplayPictureArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Managing community member details [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfTheManagingCommitteeKap) */
export type MembersOfTheManagingCommitteeKapMkapNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Managing community member details [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfTheManagingCommitteeKap) */
export type MembersOfTheManagingCommitteeKapMkapPositionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type MembersOfTheManagingCommitteeKapCollection = {
  __typename?: 'MembersOfTheManagingCommitteeKapCollection';
  items: Array<Maybe<MembersOfTheManagingCommitteeKap>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MembersOfTheManagingCommitteeKapFilter = {
  AND?: InputMaybe<Array<InputMaybe<MembersOfTheManagingCommitteeKapFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MembersOfTheManagingCommitteeKapFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  mkapDisplayPicture_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mkapName?: InputMaybe<Scalars['String']['input']>;
  mkapName_contains?: InputMaybe<Scalars['String']['input']>;
  mkapName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mkapName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mkapName_not?: InputMaybe<Scalars['String']['input']>;
  mkapName_not_contains?: InputMaybe<Scalars['String']['input']>;
  mkapName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mkapPosition?: InputMaybe<Scalars['String']['input']>;
  mkapPosition_contains?: InputMaybe<Scalars['String']['input']>;
  mkapPosition_exists?: InputMaybe<Scalars['Boolean']['input']>;
  mkapPosition_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mkapPosition_not?: InputMaybe<Scalars['String']['input']>;
  mkapPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  mkapPosition_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type MembersOfTheManagingCommitteeKapLinkingCollections = {
  __typename?: 'MembersOfTheManagingCommitteeKapLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type MembersOfTheManagingCommitteeKapLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum MembersOfTheManagingCommitteeKapOrder {
  MkapNameAsc = 'mkapName_ASC',
  MkapNameDesc = 'mkapName_DESC',
  MkapPositionAsc = 'mkapPosition_ASC',
  MkapPositionDesc = 'mkapPosition_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfYoungAmilPanchayatCommunity) */
export type MembersOfYoungAmilPanchayatCommunity = Entry & {
  __typename?: 'MembersOfYoungAmilPanchayatCommunity';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<MembersOfYoungAmilPanchayatCommunityLinkingCollections>;
  myacDisplayPicture?: Maybe<Asset>;
  myacName?: Maybe<Scalars['String']['output']>;
  myacPosition?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfYoungAmilPanchayatCommunity) */
export type MembersOfYoungAmilPanchayatCommunityLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfYoungAmilPanchayatCommunity) */
export type MembersOfYoungAmilPanchayatCommunityMyacDisplayPictureArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfYoungAmilPanchayatCommunity) */
export type MembersOfYoungAmilPanchayatCommunityMyacNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/membersOfYoungAmilPanchayatCommunity) */
export type MembersOfYoungAmilPanchayatCommunityMyacPositionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type MembersOfYoungAmilPanchayatCommunityCollection = {
  __typename?: 'MembersOfYoungAmilPanchayatCommunityCollection';
  items: Array<Maybe<MembersOfYoungAmilPanchayatCommunity>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MembersOfYoungAmilPanchayatCommunityFilter = {
  AND?: InputMaybe<Array<InputMaybe<MembersOfYoungAmilPanchayatCommunityFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MembersOfYoungAmilPanchayatCommunityFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  myacDisplayPicture_exists?: InputMaybe<Scalars['Boolean']['input']>;
  myacName?: InputMaybe<Scalars['String']['input']>;
  myacName_contains?: InputMaybe<Scalars['String']['input']>;
  myacName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  myacName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  myacName_not?: InputMaybe<Scalars['String']['input']>;
  myacName_not_contains?: InputMaybe<Scalars['String']['input']>;
  myacName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  myacPosition?: InputMaybe<Scalars['String']['input']>;
  myacPosition_contains?: InputMaybe<Scalars['String']['input']>;
  myacPosition_exists?: InputMaybe<Scalars['Boolean']['input']>;
  myacPosition_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  myacPosition_not?: InputMaybe<Scalars['String']['input']>;
  myacPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  myacPosition_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type MembersOfYoungAmilPanchayatCommunityLinkingCollections = {
  __typename?: 'MembersOfYoungAmilPanchayatCommunityLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type MembersOfYoungAmilPanchayatCommunityLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum MembersOfYoungAmilPanchayatCommunityOrder {
  MyacNameAsc = 'myacName_ASC',
  MyacNameDesc = 'myacName_DESC',
  MyacPositionAsc = 'myacPosition_ASC',
  MyacPositionDesc = 'myacPosition_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Updation of Office Bearers to be done here [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/officeBearers) */
export type OfficeBearers = Entry & {
  __typename?: 'OfficeBearers';
  contentfulMetadata: ContentfulMetadata;
  displayPicture?: Maybe<Asset>;
  linkedFrom?: Maybe<OfficeBearersLinkingCollections>;
  officeBearerName?: Maybe<Scalars['String']['output']>;
  officeBearerPosition?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** Updation of Office Bearers to be done here [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/officeBearers) */
export type OfficeBearersDisplayPictureArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Updation of Office Bearers to be done here [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/officeBearers) */
export type OfficeBearersLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Updation of Office Bearers to be done here [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/officeBearers) */
export type OfficeBearersOfficeBearerNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Updation of Office Bearers to be done here [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/officeBearers) */
export type OfficeBearersOfficeBearerPositionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type OfficeBearersCollection = {
  __typename?: 'OfficeBearersCollection';
  items: Array<Maybe<OfficeBearers>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type OfficeBearersFilter = {
  AND?: InputMaybe<Array<InputMaybe<OfficeBearersFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OfficeBearersFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  displayPicture_exists?: InputMaybe<Scalars['Boolean']['input']>;
  officeBearerName?: InputMaybe<Scalars['String']['input']>;
  officeBearerName_contains?: InputMaybe<Scalars['String']['input']>;
  officeBearerName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  officeBearerName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  officeBearerName_not?: InputMaybe<Scalars['String']['input']>;
  officeBearerName_not_contains?: InputMaybe<Scalars['String']['input']>;
  officeBearerName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  officeBearerPosition?: InputMaybe<Scalars['String']['input']>;
  officeBearerPosition_contains?: InputMaybe<Scalars['String']['input']>;
  officeBearerPosition_exists?: InputMaybe<Scalars['Boolean']['input']>;
  officeBearerPosition_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  officeBearerPosition_not?: InputMaybe<Scalars['String']['input']>;
  officeBearerPosition_not_contains?: InputMaybe<Scalars['String']['input']>;
  officeBearerPosition_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type OfficeBearersLinkingCollections = {
  __typename?: 'OfficeBearersLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type OfficeBearersLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum OfficeBearersOrder {
  OfficeBearerNameAsc = 'officeBearerName_ASC',
  OfficeBearerNameDesc = 'officeBearerName_DESC',
  OfficeBearerPositionAsc = 'officeBearerPosition_ASC',
  OfficeBearerPositionDesc = 'officeBearerPosition_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentType = Entry & {
  __typename?: 'PastEventContentType';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<PastEventContentTypeLinkingCollections>;
  pastEventDate?: Maybe<Scalars['DateTime']['output']>;
  pastEventDescription?: Maybe<PastEventContentTypePastEventDescription>;
  pastEventDisplayPicture?: Maybe<Asset>;
  pastEventLocation?: Maybe<Scalars['String']['output']>;
  pastEventName?: Maybe<Scalars['String']['output']>;
  pastEventPicturesCollection?: Maybe<AssetCollection>;
  pastEventSearchTags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  pastEventSlug?: Maybe<Scalars['String']['output']>;
  pastEventType?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypeLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventDisplayPictureArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventLocationArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventPicturesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventSearchTagsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventSlugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Event content model type dedicated only towards past events [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/pastEventContentType) */
export type PastEventContentTypePastEventTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type PastEventContentTypeCollection = {
  __typename?: 'PastEventContentTypeCollection';
  items: Array<Maybe<PastEventContentType>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PastEventContentTypeFilter = {
  AND?: InputMaybe<Array<InputMaybe<PastEventContentTypeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PastEventContentTypeFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  pastEventDate?: InputMaybe<Scalars['DateTime']['input']>;
  pastEventDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  pastEventDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  pastEventDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  pastEventDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  pastEventDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  pastEventDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  pastEventDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  pastEventDescription_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventDisplayPicture_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventLocation?: InputMaybe<Scalars['String']['input']>;
  pastEventLocation_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventLocation_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventLocation_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventLocation_not?: InputMaybe<Scalars['String']['input']>;
  pastEventLocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventLocation_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventName?: InputMaybe<Scalars['String']['input']>;
  pastEventName_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventName_not?: InputMaybe<Scalars['String']['input']>;
  pastEventName_not_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventPicturesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventSearchTags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventSearchTags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventSearchTags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventSearchTags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventSlug?: InputMaybe<Scalars['String']['input']>;
  pastEventSlug_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventSlug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventSlug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventSlug_not?: InputMaybe<Scalars['String']['input']>;
  pastEventSlug_not_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventSlug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventType?: InputMaybe<Scalars['String']['input']>;
  pastEventType_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pastEventType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pastEventType_not?: InputMaybe<Scalars['String']['input']>;
  pastEventType_not_contains?: InputMaybe<Scalars['String']['input']>;
  pastEventType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type PastEventContentTypeLinkingCollections = {
  __typename?: 'PastEventContentTypeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PastEventContentTypeLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum PastEventContentTypeOrder {
  PastEventDateAsc = 'pastEventDate_ASC',
  PastEventDateDesc = 'pastEventDate_DESC',
  PastEventLocationAsc = 'pastEventLocation_ASC',
  PastEventLocationDesc = 'pastEventLocation_DESC',
  PastEventNameAsc = 'pastEventName_ASC',
  PastEventNameDesc = 'pastEventName_DESC',
  PastEventSlugAsc = 'pastEventSlug_ASC',
  PastEventSlugDesc = 'pastEventSlug_DESC',
  PastEventTypeAsc = 'pastEventType_ASC',
  PastEventTypeDesc = 'pastEventType_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PastEventContentTypePastEventDescription = {
  __typename?: 'PastEventContentTypePastEventDescription';
  json: Scalars['JSON']['output'];
  links: PastEventContentTypePastEventDescriptionLinks;
};

export type PastEventContentTypePastEventDescriptionAssets = {
  __typename?: 'PastEventContentTypePastEventDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type PastEventContentTypePastEventDescriptionEntries = {
  __typename?: 'PastEventContentTypePastEventDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type PastEventContentTypePastEventDescriptionLinks = {
  __typename?: 'PastEventContentTypePastEventDescriptionLinks';
  assets: PastEventContentTypePastEventDescriptionAssets;
  entries: PastEventContentTypePastEventDescriptionEntries;
  resources: PastEventContentTypePastEventDescriptionResources;
};

export type PastEventContentTypePastEventDescriptionResources = {
  __typename?: 'PastEventContentTypePastEventDescriptionResources';
  block: Array<ResourceLink>;
  hyperlink: Array<ResourceLink>;
  inline: Array<ResourceLink>;
};

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  blogContentType?: Maybe<BlogContentType>;
  blogContentTypeCollection?: Maybe<BlogContentTypeCollection>;
  entryCollection?: Maybe<EntryCollection>;
  eventContentType?: Maybe<EventContentType>;
  eventContentTypeCollection?: Maybe<EventContentTypeCollection>;
  eventImageSlider?: Maybe<EventImageSlider>;
  eventImageSliderCollection?: Maybe<EventImageSliderCollection>;
  induShaniWords?: Maybe<InduShaniWords>;
  induShaniWordsCollection?: Maybe<InduShaniWordsCollection>;
  membersOfTheManagingCommitteeKap?: Maybe<MembersOfTheManagingCommitteeKap>;
  membersOfTheManagingCommitteeKapCollection?: Maybe<MembersOfTheManagingCommitteeKapCollection>;
  membersOfYoungAmilPanchayatCommunity?: Maybe<MembersOfYoungAmilPanchayatCommunity>;
  membersOfYoungAmilPanchayatCommunityCollection?: Maybe<MembersOfYoungAmilPanchayatCommunityCollection>;
  officeBearers?: Maybe<OfficeBearers>;
  officeBearersCollection?: Maybe<OfficeBearersCollection>;
  pastEventContentType?: Maybe<PastEventContentType>;
  pastEventContentTypeCollection?: Maybe<PastEventContentTypeCollection>;
  termsAndCondition?: Maybe<TermsAndCondition>;
  termsAndConditionCollection?: Maybe<TermsAndConditionCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryBlogContentTypeArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBlogContentTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogContentTypeOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlogContentTypeFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryEventContentTypeArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEventContentTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EventContentTypeOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventContentTypeFilter>;
};


export type QueryEventImageSliderArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEventImageSliderCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EventImageSliderOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventImageSliderFilter>;
};


export type QueryInduShaniWordsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryInduShaniWordsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<InduShaniWordsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<InduShaniWordsFilter>;
};


export type QueryMembersOfTheManagingCommitteeKapArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMembersOfTheManagingCommitteeKapCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MembersOfTheManagingCommitteeKapOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MembersOfTheManagingCommitteeKapFilter>;
};


export type QueryMembersOfYoungAmilPanchayatCommunityArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMembersOfYoungAmilPanchayatCommunityCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<MembersOfYoungAmilPanchayatCommunityOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MembersOfYoungAmilPanchayatCommunityFilter>;
};


export type QueryOfficeBearersArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOfficeBearersCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<OfficeBearersOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OfficeBearersFilter>;
};


export type QueryPastEventContentTypeArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPastEventContentTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PastEventContentTypeOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PastEventContentTypeFilter>;
};


export type QueryTermsAndConditionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTermsAndConditionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<TermsAndConditionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TermsAndConditionFilter>;
};

export type ResourceLink = {
  __typename?: 'ResourceLink';
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  type: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * T&C and Privacy Policy for the site
 *  [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/termsAndCondition)
 */
export type TermsAndCondition = Entry & {
  __typename?: 'TermsAndCondition';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TermsAndConditionLinkingCollections>;
  privacyPolicyContent?: Maybe<TermsAndConditionPrivacyPolicyContent>;
  sys: Sys;
  tCContent?: Maybe<TermsAndConditionTcContent>;
};


/**
 * T&C and Privacy Policy for the site
 *  [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/termsAndCondition)
 */
export type TermsAndConditionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/**
 * T&C and Privacy Policy for the site
 *  [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/termsAndCondition)
 */
export type TermsAndConditionPrivacyPolicyContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/**
 * T&C and Privacy Policy for the site
 *  [See type definition](https://app.contentful.com/spaces/f0p9zov000x1/content_types/termsAndCondition)
 */
export type TermsAndConditionTcContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type TermsAndConditionCollection = {
  __typename?: 'TermsAndConditionCollection';
  items: Array<Maybe<TermsAndCondition>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TermsAndConditionFilter = {
  AND?: InputMaybe<Array<InputMaybe<TermsAndConditionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TermsAndConditionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  privacyPolicyContent_contains?: InputMaybe<Scalars['String']['input']>;
  privacyPolicyContent_exists?: InputMaybe<Scalars['Boolean']['input']>;
  privacyPolicyContent_not_contains?: InputMaybe<Scalars['String']['input']>;
  sys?: InputMaybe<SysFilter>;
  tCContent_contains?: InputMaybe<Scalars['String']['input']>;
  tCContent_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tCContent_not_contains?: InputMaybe<Scalars['String']['input']>;
};

export type TermsAndConditionLinkingCollections = {
  __typename?: 'TermsAndConditionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type TermsAndConditionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum TermsAndConditionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type TermsAndConditionPrivacyPolicyContent = {
  __typename?: 'TermsAndConditionPrivacyPolicyContent';
  json: Scalars['JSON']['output'];
  links: TermsAndConditionPrivacyPolicyContentLinks;
};

export type TermsAndConditionPrivacyPolicyContentAssets = {
  __typename?: 'TermsAndConditionPrivacyPolicyContentAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TermsAndConditionPrivacyPolicyContentEntries = {
  __typename?: 'TermsAndConditionPrivacyPolicyContentEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TermsAndConditionPrivacyPolicyContentLinks = {
  __typename?: 'TermsAndConditionPrivacyPolicyContentLinks';
  assets: TermsAndConditionPrivacyPolicyContentAssets;
  entries: TermsAndConditionPrivacyPolicyContentEntries;
  resources: TermsAndConditionPrivacyPolicyContentResources;
};

export type TermsAndConditionPrivacyPolicyContentResources = {
  __typename?: 'TermsAndConditionPrivacyPolicyContentResources';
  block: Array<ResourceLink>;
  hyperlink: Array<ResourceLink>;
  inline: Array<ResourceLink>;
};

export type TermsAndConditionTcContent = {
  __typename?: 'TermsAndConditionTCContent';
  json: Scalars['JSON']['output'];
  links: TermsAndConditionTcContentLinks;
};

export type TermsAndConditionTcContentAssets = {
  __typename?: 'TermsAndConditionTCContentAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TermsAndConditionTcContentEntries = {
  __typename?: 'TermsAndConditionTCContentEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TermsAndConditionTcContentLinks = {
  __typename?: 'TermsAndConditionTCContentLinks';
  assets: TermsAndConditionTcContentAssets;
  entries: TermsAndConditionTcContentEntries;
  resources: TermsAndConditionTcContentResources;
};

export type TermsAndConditionTcContentResources = {
  __typename?: 'TermsAndConditionTCContentResources';
  block: Array<ResourceLink>;
  hyperlink: Array<ResourceLink>;
  inline: Array<ResourceLink>;
};

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type EventCollectionQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type EventCollectionQueryQuery = { __typename?: 'Query', eventContentTypeCollection?: { __typename?: 'EventContentTypeCollection', items: Array<{ __typename?: 'EventContentType', eventTitle?: string | null, eventSlug?: string | null, eventSearchTags?: Array<string | null> | null, eventLocation?: string | null, eventDates?: any | null, eventType?: Array<string | null> | null, contentfulMetadata: { __typename?: 'ContentfulMetadata', tags: Array<{ __typename?: 'ContentfulTag', name?: string | null } | null> }, eventDisplayImage?: { __typename?: 'Asset', url?: string | null } | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type EventDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type EventDetailQuery = { __typename?: 'Query', eventContentType?: { __typename?: 'EventContentType', eventTitle?: string | null, eventSlug?: string | null, eventSearchTags?: Array<string | null> | null, eventLocation?: string | null, eventDates?: any | null, eventType?: Array<string | null> | null, eventDisplayImage?: { __typename?: 'Asset', url?: string | null } | null, eventDescription?: { __typename?: 'EventContentTypeEventDescription', json: any } | null, sys: { __typename?: 'Sys', id: string } } | null };

export type InduShaniWordsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type InduShaniWordsQueryQuery = { __typename?: 'Query', induShaniWords?: { __typename?: 'InduShaniWords', herWords?: string | null } | null };

export type MembersOfTheManagingCommitteeKapQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MembersOfTheManagingCommitteeKapQueryQuery = { __typename?: 'Query', membersOfTheManagingCommitteeKapCollection?: { __typename?: 'MembersOfTheManagingCommitteeKapCollection', items: Array<{ __typename?: 'MembersOfTheManagingCommitteeKap', mkapName?: string | null, mkapPosition?: string | null, mkapDisplayPicture?: { __typename?: 'Asset', url?: string | null } | null } | null> } | null };

export type MembersOfTheManagingCommitteeYacQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MembersOfTheManagingCommitteeYacQueryQuery = { __typename?: 'Query', membersOfYoungAmilPanchayatCommunityCollection?: { __typename?: 'MembersOfYoungAmilPanchayatCommunityCollection', items: Array<{ __typename?: 'MembersOfYoungAmilPanchayatCommunity', myacName?: string | null, myacPosition?: string | null, myacDisplayPicture?: { __typename?: 'Asset', url?: string | null } | null } | null> } | null };

export type OfficeBearersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type OfficeBearersQueryQuery = { __typename?: 'Query', officeBearersCollection?: { __typename?: 'OfficeBearersCollection', items: Array<{ __typename?: 'OfficeBearers', officeBearerPosition?: string | null, officeBearerName?: string | null, displayPicture?: { __typename?: 'Asset', url?: string | null } | null } | null> } | null };

export type PageBlogPostQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PageBlogPostQuery = { __typename?: 'Query', blogContentType?: { __typename?: 'BlogContentType', blogTitle?: string | null, author?: string | null, dateOfBlog?: any | null, blogTags?: Array<string | null> | null, blogType?: Array<string | null> | null, blogDisplayPicture?: { __typename?: 'Asset', url?: string | null } | null, blogContent?: { __typename?: 'BlogContentTypeBlogContent', json: any } | null } | null };

export type PageBlogPostCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type PageBlogPostCollectionQuery = { __typename?: 'Query', blogContentTypeCollection?: { __typename?: 'BlogContentTypeCollection', items: Array<{ __typename?: 'BlogContentType', blogTitle?: string | null, author?: string | null, dateOfBlog?: any | null, excerpt?: string | null, blogSlug?: string | null, blogType?: Array<string | null> | null, blogTags?: Array<string | null> | null, blogDisplayPicture?: { __typename?: 'Asset', url?: string | null } | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type PastEventDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PastEventDetailQuery = { __typename?: 'Query', pastEventContentType?: { __typename?: 'PastEventContentType', pastEventType?: string | null, pastEventSlug?: string | null, pastEventName?: string | null, pastEventLocation?: string | null, pastEventSearchTags?: Array<string | null> | null, pastEventDate?: any | null, pastEventDisplayPicture?: { __typename?: 'Asset', url?: string | null } | null, pastEventDescription?: { __typename?: 'PastEventContentTypePastEventDescription', json: any } | null, pastEventPicturesCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', url?: string | null } | null> } | null } | null };

export type PastEventContentTypeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PastEventContentTypeQueryQuery = { __typename?: 'Query', pastEventContentTypeCollection?: { __typename?: 'PastEventContentTypeCollection', items: Array<{ __typename?: 'PastEventContentType', pastEventType?: string | null, pastEventSlug?: string | null, pastEventName?: string | null, pastEventLocation?: string | null, pastEventSearchTags?: Array<string | null> | null, pastEventDate?: any | null, sys: { __typename?: 'Sys', id: string }, pastEventDisplayPicture?: { __typename?: 'Asset', url?: string | null } | null, pastEventDescription?: { __typename?: 'PastEventContentTypePastEventDescription', json: any } | null, pastEventPicturesCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', url?: string | null } | null> } | null } | null> } | null };


export const EventCollectionQueryDocument = gql`
    query eventCollectionQuery {
  eventContentTypeCollection {
    items {
      contentfulMetadata {
        tags {
          name
        }
      }
      eventTitle
      eventSlug
      eventDisplayImage {
        url
      }
      eventSearchTags
      eventLocation
      eventDates
      eventType
      sys {
        id
      }
    }
  }
}
    `;
export const EventDetailDocument = gql`
    query eventDetail($id: String!) {
  eventContentType(id: $id) {
    eventTitle
    eventSlug
    eventDisplayImage {
      url
    }
    eventDescription {
      json
    }
    eventSearchTags
    eventLocation
    eventDates
    eventType
    sys {
      id
    }
  }
}
    `;
export const InduShaniWordsQueryDocument = gql`
    query induShaniWordsQuery {
  induShaniWords(id: "3Yrx5Pe6LjpWYe5puQo8Vk") {
    herWords
  }
}
    `;
export const MembersOfTheManagingCommitteeKapQueryDocument = gql`
    query membersOfTheManagingCommitteeKapQuery {
  membersOfTheManagingCommitteeKapCollection {
    items {
      mkapName
      mkapPosition
      mkapDisplayPicture {
        url
      }
    }
  }
}
    `;
export const MembersOfTheManagingCommitteeYacQueryDocument = gql`
    query membersOfTheManagingCommitteeYacQuery {
  membersOfYoungAmilPanchayatCommunityCollection {
    items {
      myacName
      myacPosition
      myacDisplayPicture {
        url
      }
    }
  }
}
    `;
export const OfficeBearersQueryDocument = gql`
    query officeBearersQuery {
  officeBearersCollection {
    items {
      displayPicture {
        url
      }
      officeBearerPosition
      officeBearerName
    }
  }
}
    `;
export const PageBlogPostDocument = gql`
    query pageBlogPost($id: String!) {
  blogContentType(id: $id) {
    blogTitle
    author
    dateOfBlog
    blogTags
    blogType
    blogDisplayPicture {
      url
    }
    blogContent {
      json
    }
  }
}
    `;
export const PageBlogPostCollectionDocument = gql`
    query pageBlogPostCollection {
  blogContentTypeCollection {
    items {
      blogTitle
      author
      dateOfBlog
      excerpt
      blogSlug
      blogType
      blogTags
      blogDisplayPicture {
        url
      }
      sys {
        id
      }
    }
  }
}
    `;
export const PastEventDetailDocument = gql`
    query pastEventDetail($id: String!) {
  pastEventContentType(id: $id) {
    pastEventType
    pastEventSlug
    pastEventName
    pastEventLocation
    pastEventSearchTags
    pastEventDisplayPicture {
      url
    }
    pastEventDate
    pastEventDescription {
      json
    }
    pastEventPicturesCollection {
      items {
        url
      }
    }
  }
}
    `;
export const PastEventContentTypeQueryDocument = gql`
    query pastEventContentTypeQuery {
  pastEventContentTypeCollection {
    items {
      pastEventType
      pastEventSlug
      pastEventName
      pastEventLocation
      pastEventSearchTags
      sys {
        id
      }
      pastEventDisplayPicture {
        url
      }
      pastEventDate
      pastEventDescription {
        json
      }
      pastEventPicturesCollection {
        items {
          url
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    eventCollectionQuery(variables?: EventCollectionQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventCollectionQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventCollectionQueryQuery>(EventCollectionQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'eventCollectionQuery', 'query');
    },
    eventDetail(variables: EventDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EventDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventDetailQuery>(EventDetailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'eventDetail', 'query');
    },
    induShaniWordsQuery(variables?: InduShaniWordsQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<InduShaniWordsQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InduShaniWordsQueryQuery>(InduShaniWordsQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'induShaniWordsQuery', 'query');
    },
    membersOfTheManagingCommitteeKapQuery(variables?: MembersOfTheManagingCommitteeKapQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MembersOfTheManagingCommitteeKapQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MembersOfTheManagingCommitteeKapQueryQuery>(MembersOfTheManagingCommitteeKapQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'membersOfTheManagingCommitteeKapQuery', 'query');
    },
    membersOfTheManagingCommitteeYacQuery(variables?: MembersOfTheManagingCommitteeYacQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MembersOfTheManagingCommitteeYacQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MembersOfTheManagingCommitteeYacQueryQuery>(MembersOfTheManagingCommitteeYacQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'membersOfTheManagingCommitteeYacQuery', 'query');
    },
    officeBearersQuery(variables?: OfficeBearersQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OfficeBearersQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OfficeBearersQueryQuery>(OfficeBearersQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'officeBearersQuery', 'query');
    },
    pageBlogPost(variables: PageBlogPostQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PageBlogPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBlogPostQuery>(PageBlogPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageBlogPost', 'query');
    },
    pageBlogPostCollection(variables?: PageBlogPostCollectionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PageBlogPostCollectionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBlogPostCollectionQuery>(PageBlogPostCollectionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pageBlogPostCollection', 'query');
    },
    pastEventDetail(variables: PastEventDetailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PastEventDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PastEventDetailQuery>(PastEventDetailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pastEventDetail', 'query');
    },
    pastEventContentTypeQuery(variables?: PastEventContentTypeQueryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PastEventContentTypeQueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PastEventContentTypeQueryQuery>(PastEventContentTypeQueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pastEventContentTypeQuery', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;