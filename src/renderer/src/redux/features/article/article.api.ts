import { baseAPI } from "@renderer/redux/api/baseApi";


export const articleApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getContentByCategorySlug: build.query({
      query: (categorySlug) => ({
        url: `/content/category/${categorySlug}`,
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    geContentBySubCaregorySlug: build.query({
      query: (ContentsubCategorySlug) => ({
        url: `/content/subcategory/${ContentsubCategorySlug}`,
        method: "GET",
      }),
      providesTags: ["content"],
    }),



    getHomePageData: build.query({
      query: () => ({
        url: "/content/home-page-content",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // for all user category and sub category
    getArticlesByCategory: build.query({
      query: (categorySlug: string) => ({
        url: `/content/category/${categorySlug}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    getArticlesBySubCategory: build.query({
      query: (subCategorySlug: string) => ({
        url: `/content/subcategory/${subCategorySlug}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // for contributor get my articles

    getMyArticles: build.query({
      query: () => ({
        url: "/content/by-user",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // for all user article get
    getAllArticle: build.query({
      query: () => ({
        url: "/content/contents-all",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    editContent: build.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/content/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["content"],
    }),

    // for all user get article details

    getArticleDetails: build.query({
      query: (id: string) => ({
        url: `/content/${id}`,
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // for contributor article post
    createNewArticle: build.mutation({
      query: (data: any) => ({
        url: "/content",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["content"],
    }),

    //--------------------- ADMIN AND EDITOR ---------------------

    // recent article for editor and admin
    getRecentArticle: build.query({
      query: () => ({
        url: "/admin-management/recent-contents",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // pending article for editor and admin
    getPendingArticle: build.query({
      query: () => ({
        url: "/admin-management/all-contents-pending",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // approved article for editor and admin

    getApprovedArticle: build.query({
      query: () => ({
        url: "/admin-management/all-contents-approve",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // declined content for editor and admin

    getDeclinedArticle: build.query({
      query: () => ({
        url: "/admin-management/all-contents-Decline",
        method: "GET",
      }),
      providesTags: ["content"],
    }),

    // update article staus for editor and admin

    updateArticleStatus: build.mutation({
      query: ({ status, id }) => ({
        url: `/admin-management/${id}/content-status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["content"],
    }),
    countView: build.mutation({
      query: (id) => ({
        url: `/content/${id}/views`,
        method: "PATCH",
      }),
      invalidatesTags: ["content"],
    }),

    getAllArticleForReccomendation: build.query({
      query: () => ({
        url: "/content/contentType-article",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    getRecommendedArticle: build.query({
      query: (id) => ({
        url: `/content/recommended-articles/${id}`,
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    uploadFileIntoAWS: build.mutation({
      query: (data) => ({
        url: "/aws-additional/upload-s3-additional",
        method: "POST",
        body: data
      })
    })
    //  end
  }),
});

export const {
  useGetAllArticleQuery,
  useCreateNewArticleMutation,
  useGetRecentArticleQuery,
  useGetPendingArticleQuery,
  useGetApprovedArticleQuery,
  useGetDeclinedArticleQuery,
  useUpdateArticleStatusMutation,
  useGetArticleDetailsQuery,
  useGetMyArticlesQuery,
  useGetHomePageDataQuery,
  useEditContentMutation,
  useGeContentBySubCaregorySlugQuery,
  useGetContentByCategorySlugQuery,
  useGetAllArticleForReccomendationQuery,
  useUploadFileIntoAWSMutation,
  useCountViewMutation,
  useGetRecommendedArticleQuery
} = articleApi;