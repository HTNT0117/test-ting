package Controllers

import (
	"net/http"
	"strconv"
	"wan-api-kol-event/Const"
	"wan-api-kol-event/Logic"
	"wan-api-kol-event/ViewModels"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)
func GetKolsController(context *gin.Context) {
	var KolsVM ViewModels.KolViewModel
	var guid = uuid.New().String()

	pageIndex, err := getQueryParamAsInt(context, "pageIndex", 1)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"result":       Const.UnSuccess,
			"errorMessage": "Invalid pageIndex",
		})
		return
	}

	pageSize, err := getQueryParamAsInt(context, "pageSize", 10)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"result":       Const.UnSuccess,
			"errorMessage": "Invalid pageSize",
		})
		return
	}

	kols, totalCount, logicErr := Logic.GetKolLogic(pageIndex, pageSize)
	if logicErr != nil {
		KolsVM.Result = Const.UnSuccess
		KolsVM.ErrorMessage = logicErr.Error()
		KolsVM.PageIndex = int64(pageIndex)
		KolsVM.PageSize = int64(pageSize)   
		KolsVM.Guid = guid
		context.JSON(http.StatusInternalServerError, KolsVM)
		return
	}
	
	KolsVM.Result = Const.Success
	KolsVM.ErrorMessage = ""
	KolsVM.PageIndex = int64(pageIndex) 
	KolsVM.PageSize = int64(pageSize) 
	KolsVM.Guid = guid
	KolsVM.KOL = kols
	KolsVM.TotalCount = totalCount
	context.JSON(http.StatusOK, KolsVM)
	
	
}

func getQueryParamAsInt(context *gin.Context, param string, defaultValue int) (int, error) {
	if context.Query(param) != "" {
		val, err := strconv.Atoi(context.Query(param))
		if err != nil || val <= 0 {
			return 0, err
		}
		return val, nil
	}
	return defaultValue, nil
}
